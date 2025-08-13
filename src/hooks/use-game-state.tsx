'use client';

import { useReducer, Reducer, useCallback, useMemo, useEffect, useState } from 'react';
import { countries, categories as allCategories, Country, Category } from '@/lib/data';
import { generateHint } from '@/ai/flows/generate-hint';
import type { Settings } from './use-settings';
import type { useAchievements } from './use-achievements';
import { useToast } from './use-toast';

type GameState = 'menu' | 'custom' | 'playing' | 'results' | 'achievements';

interface RoundResult {
  country: Country;
  selectedCategory: Category;
  score: number;
  bestCategory?: Category;
  hint?: string;
  hintLoading: boolean;
  isPerfectPick: boolean;
}

interface State {
  gameState: GameState;
  gameCountries: Country[];
  gameCategories: Category[];
  currentRoundIndex: number;
  score: number;
  history: RoundResult[];
}

type Action =
  | { type: 'START_GAME'; payload: { categories: Category[], rounds: number } }
  | { type: 'SELECT_CATEGORY'; payload: { category: Category, bestCategory?: Category, isPerfectPick: boolean } }
  | { type: 'SET_HINT'; payload: { hint: string } }
  | { type: 'SET_HINT_LOADING'; payload: { loading: boolean } }
  | { type: 'NEXT_ROUND' }
  | { type: 'END_GAME' }
  | { type: 'GO_TO_MENU' }
  | { type: 'GO_TO_CUSTOM' }
  | { type: 'GO_TO_ACHIEVEMENTS' };

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const initialState: State = {
  gameState: 'menu',
  gameCountries: [],
  gameCategories: [],
  currentRoundIndex: 0,
  score: 0,
  history: [],
};

const gameReducer: Reducer<State, Action> = (state, action): State => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameState: 'playing',
        gameCategories: action.payload.categories,
        gameCountries: shuffleArray(countries).slice(0, action.payload.rounds),
      };
    case 'SELECT_CATEGORY': {
      const currentCountry = state.gameCountries[state.currentRoundIndex];
      const score = currentCountry.ranks[action.payload.category.id];
      
      return {
        ...state,
        history: [
          ...state.history,
          {
            country: currentCountry,
            selectedCategory: action.payload.category,
            score,
            bestCategory: action.payload.bestCategory,
            hintLoading: true,
            isPerfectPick: action.payload.isPerfectPick,
          },
        ],
      };
    }
    case 'SET_HINT': {
        const newHistory = [...state.history];
        if(newHistory.length > 0) {
            newHistory[newHistory.length-1].hint = action.payload.hint;
            newHistory[newHistory.length-1].hintLoading = false;
        }
        return { ...state, history: newHistory };
    }
    case 'SET_HINT_LOADING': {
        const newHistory = [...state.history];
        if(newHistory.length > 0) {
            newHistory[newHistory.length-1].hintLoading = action.payload.loading;
        }
        return { ...state, history: newHistory };
    }
    case 'NEXT_ROUND': {
        const lastRound = state.history[state.history.length-1];
        return {
            ...state,
            currentRoundIndex: state.currentRoundIndex + 1,
            score: state.score + lastRound.score,
        };
    }
    case 'END_GAME':
      const finalScore = state.score + (state.history[state.history.length-1]?.score || 0);
      return { ...state, gameState: 'results', score: finalScore };
    case 'GO_TO_MENU':
      return { ...initialState, gameState: 'menu' };
    case 'GO_TO_CUSTOM':
        return { ...state, gameState: 'custom' };
    case 'GO_TO_ACHIEVEMENTS':
        return { ...state, gameState: 'achievements' };
    default:
      return state;
  }
};

interface GameStateProps {
    settings: Settings;
    achievements: ReturnType<typeof useAchievements>['achievements'];
    checkAndUnlockAchievements: ReturnType<typeof useAchievements>['checkAndUnlockAchievements'];
}

const LAST_CATEGORIES_KEY = 'geoRankerLastCategories';

export const useGameState = ({ settings, achievements, checkAndUnlockAchievements }: GameStateProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [lastCategories, setLastCategories] = useState<Category[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LAST_CATEGORIES_KEY);
      if (stored) {
        const categoryIds = JSON.parse(stored) as string[];
        const loadedCategories = allCategories.filter(c => categoryIds.includes(c.id));
        if (loadedCategories.length > 0) {
          setLastCategories(loadedCategories);
        }
      }
    } catch (error) {
      console.error('Failed to load last played categories from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  const saveLastCategories = (categories: Category[]) => {
    if (!Array.isArray(categories)) {
      console.error("saveLastCategories was called with a non-array value", categories);
      return;
    }
    try {
      const categoryIds = categories.map(c => c.id);
      localStorage.setItem(LAST_CATEGORIES_KEY, JSON.stringify(categoryIds));
      setLastCategories(categories);
    } catch (error) {
      console.error('Failed to save last played categories to localStorage', error);
    }
  };
  
  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);
  
  useEffect(() => {
    if (state.gameState === 'results' && isLoaded) {
      const isPerfectGame = state.history.every(h => h.isPerfectPick);
      checkAndUnlockAchievements(state.score, state.gameCategories.length, isPerfectGame);
    }
  }, [state.gameState, state.score, state.gameCategories.length, state.history, checkAndUnlockAchievements, isLoaded]);

  const nextRound = useCallback(() => {
    const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
    if (state.currentRoundIndex >= gameCategories.length - 1) {
        endGame();
    } else {
        dispatch({ type: 'NEXT_ROUND' });
    }
  }, [state.currentRoundIndex, state.gameCategories, endGame]);
  
  const handleHintGeneration = useCallback(async (
      shouldShowHint: boolean, 
      currentCountry: Country, 
      selectedCategory: Category,
      bestOtherCategory: Category,
    ) => {
    if (shouldShowHint) {
        toast({
            title: (
                <div className="flex items-center gap-2">
                    <bestOtherCategory.Icon className="h-5 w-5" />
                    <span>{bestOtherCategory.name} (#{currentCountry.ranks[bestOtherCategory.id]})</span>
                </div>
            ),
            duration: 2000,
        });
        try {
            const hintResult = await generateHint({
                country: currentCountry.name,
                selectedCategory: selectedCategory.name,
                correctCategory: bestOtherCategory.name,
                countryRankingInSelectedCategory: currentCountry.ranks[selectedCategory.id],
                countryRankingInCorrectCategory: currentCountry.ranks[bestOtherCategory.id],
            });
            dispatch({ type: 'SET_HINT', payload: { hint: hintResult.hint } });
        } catch (e) {
            console.error("Error generating hint:", e);
            dispatch({ type: 'SET_HINT', payload: { hint: "Could not generate a hint at this time." } });
        }
    } else {
        dispatch({ type: 'SET_HINT_LOADING', payload: { loading: false } });
    }
  }, [toast]);

  const selectCategory = useCallback(async (selectedCategory: Category) => {
    if (state.gameState !== 'playing' || state.history.length > state.currentRoundIndex) return;
  
    const currentCountry = state.gameCountries[state.currentRoundIndex];
    const selectedRank = currentCountry.ranks[selectedCategory.id];
  
    const gameCategories = Array.isArray(state.gameCategories) ? state.gameCategories : [];
    const usedCategoryIds = new Set(state.history.map(h => h.selectedCategory.id));
    
    const availableCategories = gameCategories.filter(c => !usedCategoryIds.has(c.id));
    const bestCategoryInRound = [...availableCategories].sort((a, b) => currentCountry.ranks[a.id] - currentCountry.ranks[b.id])[0];
    const isPerfectPick = selectedCategory.id === bestCategoryInRound.id;
    
    const otherAvailableCategories = availableCategories.filter(c => c.id !== selectedCategory.id);
    let bestOtherCategory: Category | undefined;
    if (otherAvailableCategories.length > 0) {
      bestOtherCategory = otherAvailableCategories.sort((a, b) => currentCountry.ranks[a.id] - currentCountry.ranks[b.id])[0];
    }
  
    const shouldShowHint = settings.hintsOn && bestOtherCategory && currentCountry.ranks[bestOtherCategory.id] < selectedRank;
  
    dispatch({ type: 'SELECT_CATEGORY', payload: { category: selectedCategory, bestCategory: bestCategoryInRound, isPerfectPick } });
  
    if (shouldShowHint && bestOtherCategory) {
      handleHintGeneration(true, currentCountry, selectedCategory, bestOtherCategory);
    } else {
      dispatch({ type: 'SET_HINT_LOADING', payload: { loading: false } });
    }
  
    nextRound();
  }, [state.gameState, state.currentRoundIndex, state.history, state.gameCountries, state.gameCategories, settings.hintsOn, handleHintGeneration, nextRound]);
  
  const goToMenu = useCallback(() => dispatch({ type: 'GO_TO_MENU' }), []);
  const goToCustom = useCallback(() => dispatch({ type: 'GO_TO_CUSTOM' }), []);
  const goToAchievements = useCallback(() => dispatch({ type: 'GO_TO_ACHIEVEMENTS' }), []);
  
  const startGame = useCallback((customCategories?: Category[] | React.MouseEvent) => {
    let categoriesToUse: Category[];

    if (customCategories && Array.isArray(customCategories)) {
      categoriesToUse = customCategories;
    } else if (lastCategories) {
      categoriesToUse = lastCategories;
    } else {
      categoriesToUse = shuffleArray(allCategories).slice(0, 8);
    }
    
    saveLastCategories(categoriesToUse);
    dispatch({ type: 'START_GAME', payload: { categories: categoriesToUse, rounds: categoriesToUse.length } });
  }, [lastCategories]);

  const currentCountry = useMemo(() => state.gameCountries[state.currentRoundIndex], [state.gameCountries, state.currentRoundIndex]);
  const roundResult = useMemo(() => state.history[state.currentRoundIndex], [state.history, state.currentRoundIndex]);
  
  return {
    ...state,
    currentCountry,
    roundResult,
    startGame,
    selectCategory,
    nextRound,
    goToMenu,
    goToCustom,
    goToAchievements,
  };
};

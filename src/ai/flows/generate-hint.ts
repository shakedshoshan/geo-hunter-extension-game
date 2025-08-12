// This file uses server-side code.
'use server';

/**
 * @fileOverview Generates educational hints for the Geo Ranker game using an LLM.
 *
 * - generateHint - A function that generates hints for the game.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  country: z.string().describe('The name of the country.'),
  selectedCategory: z.string().describe('The category the user selected.'),
  correctCategory: z.string().describe('The category that would have been a better pick.'),
  countryRankingInSelectedCategory: z.number().describe('The country\'s ranking in the selected category.'),
  countryRankingInCorrectCategory: z.number().describe('The country\'s ranking in the correct category.'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('An educational hint explaining why the correct category was a better pick.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are an educational game assistant for a geography ranking game.
  The player chose the category "{{selectedCategory}}" for the country {{country}}, but a better category would have been "{{correctCategory}}".
  The country ranks #{{countryRankingInSelectedCategory}} in {{selectedCategory}}, but ranks #{{countryRankingInCorrectCategory}} in {{correctCategory}}.

  Provide a concise and educational hint (one or two sentences maximum) to help the player understand why "{{correctCategory}}" was a better choice.  Focus on interesting and insightful information about the country and categories.
`,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

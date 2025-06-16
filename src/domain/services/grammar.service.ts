export interface GrammarCheckResult {
  suggestions: Array<{
    type: 'grammar' | 'spelling' | 'style';
    message: string;
    suggestion: string;
    offset: number;
    length: number;
  }>;
  confidence: number;
}

export interface GrammarService {
  checkText(text: string): Promise<GrammarCheckResult>;
}

export class GrammarServiceImpl implements GrammarService {
  private readonly openaiApiKey: string;
  private readonly anthropicApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
  }

  async checkText(text: string): Promise<GrammarCheckResult> {
    try {
      // Try OpenAI first
      const openaiResult = await this.checkWithOpenAI(text);
      if (openaiResult) {
        return openaiResult;
      }

      // Fallback to Anthropic
      const anthropicResult = await this.checkWithAnthropic(text);
      if (anthropicResult) {
        return anthropicResult;
      }

      // If both services fail, return empty result
      return {
        suggestions: [],
        confidence: 0,
      };
    } catch (error) {
      console.error('Error checking grammar:', error);
      throw error;
    }
  }

  private async checkWithOpenAI(text: string): Promise<GrammarCheckResult | null> {
    if (!this.openaiApiKey) {
      return null;
    }

    try {
      // Implement OpenAI API call here
      // This is a placeholder implementation
      return {
        suggestions: [
          {
            type: 'grammar',
            message: 'Consider using active voice',
            suggestion: 'The text should be rewritten in active voice',
            offset: 0,
            length: text.length,
          },
        ],
        confidence: 0.8,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      return null;
    }
  }

  private async checkWithAnthropic(text: string): Promise<GrammarCheckResult | null> {
    if (!this.anthropicApiKey) {
      return null;
    }

    try {
      // Implement Anthropic API call here
      // This is a placeholder implementation
      return {
        suggestions: [
          {
            type: 'style',
            message: 'Consider using more concise language',
            suggestion: 'The text could be more concise',
            offset: 0,
            length: text.length,
          },
        ],
        confidence: 0.7,
      };
    } catch (error) {
      console.error('Anthropic API error:', error);
      return null;
    }
  }
} 
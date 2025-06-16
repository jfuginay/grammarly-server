"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarServiceImpl = void 0;
class GrammarServiceImpl {
    constructor() {
        this.openaiApiKey = process.env.OPENAI_API_KEY || '';
        this.anthropicApiKey = process.env.ANTHROPIC_API_KEY || '';
    }
    async checkText(text) {
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
        }
        catch (error) {
            console.error('Error checking grammar:', error);
            throw error;
        }
    }
    async checkWithOpenAI(text) {
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
        }
        catch (error) {
            console.error('OpenAI API error:', error);
            return null;
        }
    }
    async checkWithAnthropic(text) {
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
        }
        catch (error) {
            console.error('Anthropic API error:', error);
            return null;
        }
    }
}
exports.GrammarServiceImpl = GrammarServiceImpl;
//# sourceMappingURL=grammar.service.js.map
export interface HuggingFaceResponse {
  label: string;
  score: number;
}

export type HuggingFaceErrorResponse = {
  error: string;
};

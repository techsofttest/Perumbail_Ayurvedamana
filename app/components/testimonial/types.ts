export interface SuccessStory {
  id: string;
  patientName: string;
  country: string;
  flag?: string | null;
  condition: string;
  quote?: string;
  before?: string;
  after?: string;
  hasVideo: boolean;
  link: boolean;
  video?: string;
  coverPhoto?: string;
}
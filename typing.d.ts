/* eslint-disable no-unused-vars */
interface Theme {
  id: string;
  name: string;
  backgroundImage?: string;
  textColor: string;
  backgroundColor: string;
  buttonColor: string;
  buttonText: string;
  borderColor: string;
  placeholderColor: string;
  checkboxUnchecked?: string;
  checkboxChecked?: string;
  checkboxText?: string;
  okButton?: string;
}

interface BaseQuestion {
  id: string;
  type:
    | "short_text"
    | "long_text"
    | "multiple_choice"
    | "dropdown"
    | "date"
    | "rating"
    | "boolean"
    | "email"
    | "website"
    | "file_upload"
    | "number"
    | "opinion_scale"
    | "picture_choice";
  title: string;
  description?: string;
  order: number;
  required?: boolean;
  image?: string;
  validationMessage?: string;
}

interface ShortTextQuestion extends BaseQuestion {
  type: "short_text";
  placeholder?: string;
}

interface LongTextQuestion extends BaseQuestion {
  type: "long_text";
  placeholder?: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  options: Array<{ label: string; value: string }>;
  allowMultipleSelections?: boolean;
}

interface DropdownQuestion extends BaseQuestion {
  type: "dropdown";
  options: Array<{ label: string; value: string }>;
}

interface RatingQuestion extends BaseQuestion {
  type: "rating";
  scale?: number; // Min 1, Max 10, default to 5
}

interface PictureChoiceQuestion extends BaseQuestion {
  type: "picture_choice";
  options: Array<{ label: string; imageUrl: string; value: string }>;
}

interface DateQuestion extends BaseQuestion {
  type: "date";
  format: "MM/DD/YYYY" | "YYYY-MM-DD";
}

interface BooleanQuestion extends BaseQuestion {
  type: "boolean";
  trueLabel?: string;
  falseLabel?: string;
}

interface EmailQuestion extends BaseQuestion {
  type: "email";
  placeholder?: string;
}

interface WebsiteQuestion extends BaseQuestion {
  type: "website";
  placeholder?: string;
}

interface FileUploadQuestion extends BaseQuestion {
  type: "file_upload";
  maxFileSize?: number;
  allowedFileTypes?: string[];
}

interface NumberQuestion extends BaseQuestion {
  type: "number";
  minValue?: number;
  maxValue?: number;
  placeholder?: string;
}

interface OpinionScaleQuestion extends BaseQuestion {
  type: "opinion_scale";
  minValue: number;
  maxValue: number;
  leftLabel?: string;
  rightLabel?: string;
}

// Union type for all question interfaces
type TQuestion =
  | ShortTextQuestion
  | LongTextQuestion
  | MultipleChoiceQuestion
  | DropdownQuestion
  | RatingQuestion
  | PictureChoiceQuestion
  | DateQuestion
  | BooleanQuestion
  | EmailQuestion
  | WebsiteQuestion
  | FileUploadQuestion
  | NumberQuestion
  | OpinionScaleQuestion;

interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string; // ISO 8601 timestamp
  responseData: Record<string, string | string[]>;
}

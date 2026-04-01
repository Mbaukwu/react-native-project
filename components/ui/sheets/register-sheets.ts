import { registerSheet } from 'react-native-actions-sheet';
import AuthPromptSheet from './AuthPromptSheet';
import { SheetDefinition } from 'react-native-actions-sheet';

registerSheet("auth-prompt", AuthPromptSheet);

export interface AuthPromptPayload {
  onLocalSave: () => void;
}

export const Sheets = () => null;

declare module "react-native-actions-sheet" {
  interface Sheets {
    "auth-prompt": SheetDefinition<{
      payload: AuthPromptPayload;
    }>;
  }
}
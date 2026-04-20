// ─────────────────────────────────────────────────────────────
// AuthPromptSheet Registration
// Registers: auth-prompt bottom sheet
// Handles: Type-safe payload for wishlist/auth prompt
// Depends on: react-native-actions-sheet
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { registerSheet } from 'react-native-actions-sheet';
import AuthPromptSheet from './AuthPromptSheet';
import { SheetDefinition } from 'react-native-actions-sheet';

// ── Sheet Registration ───────────────────────────────────────
registerSheet("auth-prompt", AuthPromptSheet);

// ── Types ────────────────────────────────────────────────────
export interface AuthPromptPayload {
  onLocalSave: () => void;
}

// ── Sheet Root (Required Export) ─────────────────────────────
export const Sheets = () => null;

// ── Module Augmentation ──────────────────────────────────────
// Enables strong typing for SheetManager usage
declare module "react-native-actions-sheet" {
  interface Sheets {
    "auth-prompt": SheetDefinition<{
      payload: AuthPromptPayload;
    }>;
  }
}
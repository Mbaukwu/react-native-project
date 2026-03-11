import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { ProductOptionsSheet } from "./ProductOptionsSheet";

registerSheet("product-options-sheet", ProductOptionsSheet);
export interface ExploreSheetPayload {
  productId: number;
  productTitle: string;
}

export const Sheets = () => null;
declare module "react-native-actions-sheet" {
  interface Sheets {
    "product-options-sheet": SheetDefinition<{
      payload: ExploreSheetPayload;
    }>;
  }
}

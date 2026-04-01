import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import React from "react";

export default function SignInScreen() {
  return (
    <ScreenWrapper className="bg-background">
      <AppText variant="bold">
        Sign In
      </AppText>
    </ScreenWrapper>
  );
}

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { AppButton } from "./AppButton";

describe("AppButton", () => {
    it("renders button title correctly", () => {
        render(<AppButton title="Login" onPress={() => {}} />);
        expect(screen.getByText("Login")).toBeTruthy();
    });

    it("calls onPress when button is pressed", () => {
        const mockOnPress = jest.fn();
        render(<AppButton title="Login" onPress={mockOnPress} />);
        fireEvent.press(screen.getByText("Login"));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});

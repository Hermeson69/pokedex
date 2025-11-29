import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { colorsByType } from "../types/types";


interface CardProps {
    type: keyof typeof colorsByType;
    style?: ViewStyle;
    children?: ReactNode;
}
export default function PokemonCard({ type, style, children }: CardProps) {
    return (
        <View style={[style, { backgroundColor: `${colorsByType[type]}70` }]}>
            {children}
        </View>
    );
}

import { LEONARDO_STYLES, LeonardoStyle } from "@/lib/leonardo-styles";
import { StyleSelectorProps } from "./types";
import {
  StyleGrid,
  StyleCard,
  StyleName,
  StyleDescription,
  SectionTitle,
  SelectedBadge,
} from "./styles";

export default function StyleSelector({ selectedStyleId, onStyleChange }: StyleSelectorProps) {
  return (
    <div>
      <SectionTitle>Choose Generation Style</SectionTitle>
      <StyleGrid>
        {LEONARDO_STYLES.map((style: LeonardoStyle) => (
          <StyleCard
            key={style.id}
            selected={selectedStyleId === style.id}
            onClick={() => onStyleChange(style.id)}
          >
            <StyleName>{style.name}</StyleName>
            <StyleDescription>{style.description}</StyleDescription>
            {selectedStyleId === style.id && (
              <SelectedBadge>Selected</SelectedBadge>
            )}
          </StyleCard>
        ))}
      </StyleGrid>
    </div>
  );
} 
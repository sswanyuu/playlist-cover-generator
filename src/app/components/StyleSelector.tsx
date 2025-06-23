import styled from "@emotion/styled";
import { LEONARDO_STYLES, LeonardoStyle } from "@/lib/leonardo-styles";

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const StyleCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${props => props.selected ? '#1db954' : '#333'};
  border-radius: 12px;
  padding: 16px;
  background: ${props => props.selected ? 'rgba(29, 185, 84, 0.1)' : '#1a1a1a'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1db954;
    background: rgba(29, 185, 84, 0.05);
  }
`;

const StyleName = styled.h4`
  margin: 0 0 8px 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const StyleDescription = styled.p`
  margin: 0;
  color: #b3b3b3;
  font-size: 14px;
  line-height: 1.4;
`;

const SectionTitle = styled.h3`
  color: #fff;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
`;

const SelectedBadge = styled.div`
  display: inline-block;
  background: #1db954;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
`;

interface StyleSelectorProps {
  selectedStyleId: string;
  onStyleChange: (styleId: string) => void;
}

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
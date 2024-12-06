export interface Card {
    Name: string;
    Description: string;
    Id: number;
    GuardianStarA: number;
    GuardianStarB: number;
    Level: number;
    Type: number;
    Attack: number;
    Defense: number;
    Stars: number;
    CardCode: string;
    Equip: number[] | null;
    Fusions: Fusion[];
    Ritual: Ritual | null;
    Attribute: number;
    NameColor: number;
    DescColor: number;
}

export interface Fusion {
    _card1: number;
    _card2: number;
    _result: number;
}

export interface Ritual { RitualCard: number; Card1: number; Card2: number; Card3: number; Result: number; }
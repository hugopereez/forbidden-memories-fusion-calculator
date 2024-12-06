import { Card, FusionItem, FusionList, Equip } from "../interfaces";
import fusionsList from '../data/fusion.json';
import equipsList from '../data/equips.json';
import { getCardById } from "./cards";


export const findFusion = (handCards: (Card | null)[], fieldCards: (Card | null)[]): { fuses: FusionItem[], equips: Equip[] } => {
    const cards: Card[] = [...handCards, ...fieldCards].filter(card => card !== null) as Card[];
    const fuses: FusionItem[] = [];
    const equips: Equip[] = [];

    for (let i = 0; i < cards.length - 1; i++) {
        const card1 = cards[i];
        const card1Fuses: FusionList[] = fusionsList[card1.Id] as FusionList[];
        const card1Equips = equipsList[card1.Id];
        for (let j = i + 1; j < cards.length; j++) {
            const card2 = cards[j];
            const fusion = card1Fuses.find((f) => f.card === card2.Id);
            if (fusion) {
                fuses.push({ card1: card1, card2: card2, result: getCardById(fusion.result) });
            }
            if (card1Equips) {
                const equip = card1Equips.find((e) => e === card2.Id);
                if (equip) {
                    equips.push({ card1: card1, card2: card2 });
                }
            }
        }
    }

    return { fuses, equips };
};
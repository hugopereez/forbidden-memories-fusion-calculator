import { Button, Table } from "react-bootstrap";
import { Card, Equip, FusionItem } from "../../interfaces"
import { getCardType } from "../../utils/cards";
import { useAppSelector } from "../../store/hooks";
import { findFusionForCard } from "../../utils/fusion";

interface ResultProps {
    title: string
    combinations: FusionItem[] | Equip[];
    type: 'fusion' | 'equip';
    handleFuseButton?: (combination: FusionItem) => void;
}

export const Result = ({ title, combinations, handleFuseButton, type }: ResultProps) => {
    const handCards = useAppSelector(state => state.cards.handCards);
    const fieldCard = useAppSelector(state => state.cards.fieldCards);
    const sortedCombinations =
    type === 'fusion'
      ? [...(combinations as FusionItem[])].sort((a, b) => {
          const attackDiff = (b.result?.Attack ?? 0) - (a.result?.Attack ?? 0);
          if (attackDiff !== 0) return attackDiff;

          return (b.result?.Defense ?? 0) - (a.result?.Defense ?? 0);
        })
      : combinations;
    const removeOne = (cards: (Card | null)[], toRemove: Card) => {
        let removed = false;

        return cards.filter(card => {
            if (!card) return false;

            if (!removed && card === toRemove) {
            removed = true;
            return false;
            }

            return true;
        });
    };

    const handleSimulateButton = (combination: FusionItem) => {
        // Implement your simulate logic here
        if (title === 'Fusions') {
            let tempHand = removeOne(handCards, combination.card1);
            tempHand = removeOne(tempHand, combination.card2);

            let tempField = removeOne(fieldCard, combination.card1);
            tempField = removeOne(tempField, combination.card2);
            const fusions = findFusionForCard(combination.result!, tempHand, tempField);
            if (fusions.fuses.length > 0) {
                fusions.fuses.forEach(fusion => {
                    console.log(`Possible fusion for ${combination.result!.Name}: ${fusion.card1.Name} + ${fusion.card2.Name} => ${fusion.result?.Name} (${fusion.result?.Attack}/${fusion.result?.Defense}) [${getCardType(fusion.result!)}]`);
                });
            } else {
                console.log(`No se encontraron fusiones para ${combination.result!.Name}`);
            }
        }
    }
  return (
    <>
        <h3>{ title }</h3>
        {
            sortedCombinations.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Card 1</th>
                            <th>Card 2</th>
                            { type === 'fusion' && <th>Result</th> }
                            { type === 'fusion' && <th>Actions</th> }
                        </tr>
                    </thead>
                    <tbody>
                        { sortedCombinations.map((combination, index) => (
                            <tr key={`comb-${type}-${index}`}>
                                <td>{ combination.card1.Name } </td>
                                <td>{ combination.card2.Name }</td>
                                { type === 'fusion' && (
                                    <>
                                        <td>{ (combination as FusionItem).result!.Name } ({ (combination as FusionItem).result!.Attack }/{(combination as FusionItem).result!.Defense}) [{getCardType((combination as FusionItem).result!)}]</td>
                                        <td>
                                            <Button variant="primary" size="sm" onClick={() => handleFuseButton && handleFuseButton(combination as FusionItem)}>Fusion</Button>
                                            <Button variant="secondary" size="sm" onClick={() => handleSimulateButton(combination as FusionItem)}>Simulate</Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }
        {
            sortedCombinations.length === 0 && <p>No combinations found</p>
        }
    </>
  )
}

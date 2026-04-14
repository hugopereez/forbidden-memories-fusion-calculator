import { Button, Table } from "react-bootstrap";
import { Equip, FusionItem } from "../../interfaces"
import { getCardType } from "../../utils/cards";

interface ResultProps {
    title: string
    combinations: FusionItem[] | Equip[];
    type: 'fusion' | 'equip';
    handleFuseButton?: (combination: FusionItem) => void;
}

export const Result = ({ title, combinations, handleFuseButton, type }: ResultProps) => {
    const sortedCombinations =
    type === 'fusion'
      ? [...(combinations as FusionItem[])].sort((a, b) => {
          const attackDiff = (b.result?.Attack ?? 0) - (a.result?.Attack ?? 0);
          if (attackDiff !== 0) return attackDiff;

          return (b.result?.Defense ?? 0) - (a.result?.Defense ?? 0);
        })
      : combinations;
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
                                        <td><Button variant="primary" size="sm" onClick={() => handleFuseButton && handleFuseButton(combination as FusionItem)}>Fusion</Button></td>
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

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
  return (
    <>
        <h3>{ title }</h3>
        {
            combinations.length > 0 && (
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
                        { combinations.map((combination, index) => (
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
            combinations.length === 0 && <p>No combinations found</p>
        }
    </>
  )
}

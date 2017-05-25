import React from "react"

const TableRow = ({description, date, type, value}) =>
  <tr key={date.getTime() + "_" + value + "_" + description}>
   <td>{date.toLocaleDateString()}</td>
   <td>{description}</td>
   <td>{type}</td>
   <td>{value}</td>
  </tr>


class TransactionTable extends React.Component {
  render() {
    return (
      <div>
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.transactions.map(TableRow)
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default TransactionTable

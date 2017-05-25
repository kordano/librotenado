import React from "react"

class TransactionTable extends React.Component {
  render() {
    return (
      <div>
        <h3>Transactions</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
          {
            this.props.transactions.map( ({description, date, type, value}) =>
              <tr>
                <td>{date}</td>
                <td>{description}</td>
                <td>{type}</td>
                <td>{value}</td>
              </tr>
            )
          }
        </table>
      </div>
    )
  }
}

export default TransactionTable

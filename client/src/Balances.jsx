import server from "./server";

function Balances() {
  async function onChange(evt) {
    //how?
  }

  return (
    <div className="container">
      <h1>All balances</h1>

      <table>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Private</th>
            <th>Public</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>?</td>
            <td>d332f2de642b97ff721ccc814fb8f064c4035b0367486c85f9598b262152d515</td>
            <td>04b2e9624c081cc5ba69de1a0799e39c4c92c8088dcba7ad9f0767696b9cba3c039e5cf65533edf8f07b3cb9c9845321e8adf55e127258be814abb1e8863d8503d</td>
          </tr>
          <tr>
            <td>?</td>
            <td>a39d5da5c05ed89ed979d8fd5344a532e8f1245f48caa15ae420466b44183565</td>
            <td>044aa417a82ddab093bb4c8f567cb7400f978337f159a708dd6a719f0dcb84565129c0f2e368b19df28a10cd0a1c1add2b553ea9192622ae2532240ac15ee07531</td>
          </tr>
          <tr>
            <td>?</td>
            <td>22a9033180b6fc8706f194a139656c1231c77f7dd149043797c72460ab19c0cc</td>
            <td>0462290ebc99dd81980148bc64742e277ed353a19309ede08a3c4fa09fba03749f92f592001c4b6e12d6f7d02aef361c803dfe781c040c1740fa03710a55503766</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Balances;

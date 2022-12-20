// import React from 'react'

// const PreviousCurrencyConverterFile = () => {
//   return (
//     <CurrencyConverterWrapper>
//       <Title>Currency Converter</Title>
//       <p className="forDesktop">
//         Please enter an amount, select currencies and press enter
//       </p>
//       <Form onSubmit={formHandler}>
//         <ColumnWrap>
//           <AmountInputColumn>
//             <p>Amount:</p>
//             <Input
//               type="number"
//               name="currency-amount-1"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </AmountInputColumn>
//           <FirstCurrencyColumn>
//             <p>From:</p>
//             <select
//               value={primaryCurrency}
//               name="currency-option-1"
//               className="currency-options"
//               onChange={(e) => setPrimaryCurrency(e.target.value)}
//             >
//               {/* {currencies.map((currency, index) => (
//                   <option key={index}>{currency}</option>
//                 ))} */}
//               {Currencies.map((currency, index) => (
//                 <option key={index}>{currency.value}</option>
//               ))}
//             </select>
//           </FirstCurrencyColumn>
//           <SecondCurrencyColumn>
//             <p>To:</p>
//             <select
//               value={secondaryCurrency}
//               name="currency-option-2"
//               className="currency-options"
//               onChange={(e) => setSecondaryCurrency(e.target.value)}
//             >

//               {physicalCurrencies.map((currency, index) => (
//                 <option key={index}>{currency.value}</option>
//               ))}
//             </select>
//           </SecondCurrencyColumn>
//         </ColumnWrap>
//         <div className="btn-wrap">
//           <button id="convert-btn" type="submit" onClick={convert}>
//             Convert
//           </button>
//         </div>
//       </Form>
//     </CurrencyConverterWrapper>
//   );
// }

// export default PreviousCurrencyConverterFile

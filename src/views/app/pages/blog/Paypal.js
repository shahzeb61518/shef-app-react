import React, { useRef, useEffect } from "react";

export default function Paypal({ userName, total }) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: userName,
                amount: {
                  currency_code: "CAD",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          console.log("actions>>>>>>>>>>>>>>>>" + actions);

          const order = await actions.order.capture();
          console.log("order>>>>>>>>>>>>>>>>" + order);
        },
        onError: (err) => {
          console.log("errerrerrerr>>>>>>>>>>>>>" + err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

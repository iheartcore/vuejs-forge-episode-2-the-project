import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(useRuntimeConfig().stripeSecret);
  const body = await useBody(event);
  const ids = body.products.map((product) => product.sys.id)

  const res = await stripe.products.list({
    ids,
  })

  const products = res.data;
  const lineItems = products.map((product) => ({
    price: product.default_price,
    quantity: body.products.find((p) => p.sys.id === product.id).count,
  }));

  return await stripe.checkout.sessions.create({
    cancel_url: "http://localhost:3000/cart",
    success_url: "http://localhost:3000/checkout/success",
    mode: "payment",
    line_items: lineItems,
  })
});

'use client';

import { useContext, useState } from "react";
import Layout from "@/src/components/layout";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import Link from "next/link";
import { mockCartItems, addresses, shippingMethods } from "@/src/data/mockData";

export default function Cart() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: address, 2: shipping, 3: invoice
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [discountCode, setDiscountCode] = useState("");

  const renderCartItems = () => (
    <div className="space-y-4">
      {mockCartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg space-y-4 md:space-y-0"
          style={{ backgroundColor: `${currentColor.primary}10` }}
        >
          <div className="flex items-center space-x-4 space-x-reverse w-full md:w-auto">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: currentColor.text }}>{item.name}</h3>
              <p style={{ color: currentColor.primary }}>{item.price}</p>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentColor.primary }}
              >
                <span className="text-white">-</span>
              </button>
              <span style={{ color: currentColor.text }}>{item.quantity}</span>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentColor.primary }}
              >
                <span className="text-white">+</span>
              </button>
            </div>
            <button
              className="text-red-500 hover:text-red-600"
              aria-label="حذف از سبد خرید"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {mockCartItems.length > 0 && (
        <div className="mt-6 text-left">
          <div className="mb-4 text-lg font-semibold" style={{ color: currentColor.text }}>
            مجموع: ۴,۳۰۰,۰۰۰ تومان
          </div>
        </div>
      )}
    </div>
  );

  const calculateTotal = () => {
    const subtotal = 4300000; // Replace with actual calculation
    const shipping = selectedShipping === 1 ? 50000 : selectedShipping === 2 ? 80000 : 100000;
    const discount = discountCode === "WELCOME" ? subtotal * 0.1 : 0;
    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount
    };
  };

  const handleCheckout = () => {
    setCheckoutStep(1);
  };

  const handlePayment = () => {
    // Here you would typically redirect to payment gateway
    console.log('Redirecting to payment gateway...');
  };

  const renderCheckoutSteps = () => {
    const steps = ['سبد خرید', 'آدرس تحویل', 'روش ارسال', 'تایید و پرداخت'];
    return (
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between mb-8 gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= checkoutStep ? 'text-white' : ''
              }`}
              style={{
                backgroundColor: index <= checkoutStep ? currentColor.primary : `${currentColor.primary}20`,
                color: index <= checkoutStep ? 'white' : currentColor.text
              }}
            >
              {index + 1}
            </div>
            <span
              className="mr-2 text-sm md:text-base"
              style={{ color: index <= checkoutStep ? currentColor.primary : currentColor.text }}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className="mx-2 md:mx-4 h-0.5 w-8 md:w-16 hidden md:block"
                style={{
                  backgroundColor: index < checkoutStep ? currentColor.primary : `${currentColor.primary}20`
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAddressSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4" style={{ color: currentColor.text }}>
        انتخاب آدرس تحویل
      </h3>
      {addresses.map((address) => (
        <div
          key={address.id}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedAddress === address.id ? 'border-2' : 'border'
          }`}
          style={{
            borderColor: selectedAddress === address.id ? currentColor.primary : `${currentColor.primary}20`,
            backgroundColor: `${currentColor.primary}10`
          }}
          onClick={() => setSelectedAddress(address.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold" style={{ color: currentColor.text }}>
                {address.title}
              </h4>
              <p className="mt-1" style={{ color: currentColor.text }}>
                {address.address}
              </p>
              <p className="mt-2 text-sm" style={{ color: currentColor.text }}>
                گیرنده: {address.receiver} | {address.phone}
              </p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAddress === address.id ? 'border-0' : ''
              }`}
              style={{
                borderColor: currentColor.primary,
                backgroundColor: selectedAddress === address.id ? currentColor.primary : 'transparent'
              }}
            >
              {selectedAddress === address.id && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded-lg"
          style={{
            backgroundColor: `${currentColor.primary}20`,
            color: currentColor.text
          }}
          onClick={() => setCheckoutStep(0)}
        >
          بازگشت
        </button>
        <button
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: currentColor.primary }}
          onClick={() => setCheckoutStep(2)}
        >
          ادامه
        </button>
      </div>
    </div>
  );

  const renderShippingSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4" style={{ color: currentColor.text }}>
        انتخاب روش ارسال
      </h3>
      {shippingMethods.map((method) => (
        <div
          key={method.id}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedShipping === method.id ? 'border-2' : 'border'
          }`}
          style={{
            borderColor: selectedShipping === method.id ? currentColor.primary : `${currentColor.primary}20`,
            backgroundColor: `${currentColor.primary}10`
          }}
          onClick={() => setSelectedShipping(method.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold" style={{ color: currentColor.text }}>
                {method.name}
              </h4>
              <p className="text-sm mt-1" style={{ color: currentColor.text }}>
                زمان تحویل: {method.days} روز کاری
              </p>
            </div>
            <div className="flex items-center">
              <span className="ml-4" style={{ color: currentColor.primary }}>
                {method.price}
              </span>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedShipping === method.id ? 'border-0' : ''
                }`}
                style={{
                  borderColor: currentColor.primary,
                  backgroundColor: selectedShipping === method.id ? currentColor.primary : 'transparent'
                }}
              >
                {selectedShipping === method.id && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded-lg"
          style={{
            backgroundColor: `${currentColor.primary}20`,
            color: currentColor.text
          }}
          onClick={() => setCheckoutStep(1)}
        >
          بازگشت
        </button>
        <button
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: currentColor.primary }}
          onClick={() => setCheckoutStep(3)}
        >
          ادامه
        </button>
      </div>
    </div>
  );

  const renderInvoice = () => {
    const { subtotal, shipping, discount, total } = calculateTotal();
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: currentColor.text }}>
          پیش‌فاکتور سفارش
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentColor.primary}10` }}>
            <h4 className="font-semibold mb-3" style={{ color: currentColor.text }}>
              آدرس تحویل
            </h4>
            <p style={{ color: currentColor.text }}>
              {addresses.find(a => a.id === selectedAddress)?.address}
            </p>
            <p className="mt-2 text-sm" style={{ color: currentColor.text }}>
              گیرنده: {addresses.find(a => a.id === selectedAddress)?.receiver}
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentColor.primary}10` }}>
            <h4 className="font-semibold mb-3" style={{ color: currentColor.text }}>
              روش ارسال
            </h4>
            <p style={{ color: currentColor.text }}>
              {shippingMethods.find(m => m.id === selectedShipping)?.name}
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentColor.primary}10` }}>
            <h4 className="font-semibold mb-3" style={{ color: currentColor.text }}>
              کد تخفیف
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: currentColor.background,
                  color: currentColor.text,
                  borderColor: `${currentColor.primary}40`
                }}
                placeholder="کد تخفیف خود را وارد کنید"
              />
              <button
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: currentColor.primary }}
              >
                اعمال
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: `${currentColor.primary}10` }}>
            <h4 className="font-semibold mb-3" style={{ color: currentColor.text }}>
              جزئیات پرداخت
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ color: currentColor.text }}>مجموع سبد خرید:</span>
                <span style={{ color: currentColor.text }}>
                  {subtotal.toLocaleString()} تومان
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: currentColor.text }}>هزینه ارسال:</span>
                <span style={{ color: currentColor.text }}>
                  {shipping.toLocaleString()} تومان
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: currentColor.text }}>تخفیف:</span>
                  <span style={{ color: "#4CAF50" }}>
                    {discount.toLocaleString()} - تومان
                  </span>
                </div>
              )}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-semibold">
                  <span style={{ color: currentColor.primary }}>مبلغ قابل پرداخت:</span>
                  <span style={{ color: currentColor.primary }}>
                    {total.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-6 py-2 rounded-lg"
            style={{
              backgroundColor: `${currentColor.primary}20`,
              color: currentColor.text
            }}
            onClick={() => setCheckoutStep(2)}
          >
            بازگشت
          </button>
          <button
            className="px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: currentColor.primary }}
            onClick={handlePayment}
          >
            پرداخت و ثبت سفارش
          </button>
        </div>
      </div>
    );
  };

  const renderCartContent = () => {
    if (checkoutStep === 1) return renderAddressSelection();
    if (checkoutStep === 2) return renderShippingSelection();
    if (checkoutStep === 3) return renderInvoice();
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: currentColor.text }}>سبد خرید</h2>
        {mockCartItems.length === 0 ? (
          <div className="text-center py-8">
            <p style={{ color: currentColor.text }}>سبد خرید شما خالی است</p>
            <Link href="/products">
              <button
                className="mt-4 px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: currentColor.primary }}
              >
                مشاهده محصولات
              </button>
            </Link>
          </div>
        ) : (
          <>
            {renderCartItems()}
            <button
              className="mt-6 px-6 py-2 rounded-lg text-white w-full"
              style={{ backgroundColor: currentColor.primary }}
              onClick={handleCheckout}
            >
              ادامه فرایند خرید
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen" style={{ backgroundColor: currentColor.background }}>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
            {checkoutStep > 0 && renderCheckoutSteps()}
            {renderCartContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
} 
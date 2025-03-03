'use client';

import { useContext, useState, FormEvent } from "react";
import Layout from "@/src/components/layout";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import Link from "next/link";
import { mockCartItems, mockOrders, shippingMethods, addresses } from "@/src/data/mockData";

interface Address {
  id: number;
  title: string;
  address: string;
  receiver: string;
  phone: string;
}

export default function Profile() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const [activeTab, setActiveTab] = useState('profile');
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: address, 2: shipping, 3: invoice
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0].id);
  const [discountCode, setDiscountCode] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [userAddresses, setUserAddresses] = useState<Address[]>(addresses);
  
  // Mock initial data - replace with actual user data from your backend
  const [userData, setUserData] = useState({
    fullName: "نام و نام خانوادگی",
    email: "user@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
  });

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    // Here you would typically send the password change request to your backend
    console.log('Changing password...', { oldPassword, newPassword });
  };

  const handleProfileUpdate = (profileData: {
    fullName: string;
    email: string;
    phone: string;
  }) => {
    // Here you would typically send the profile update request to your backend
    console.log('Updating profile...', profileData);
    setUserData(profileData);
  };

  const handleAddressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData: Address = {
      id: editingAddress ? editingAddress.id : userAddresses.length + 1,
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLTextAreaElement).value,
      receiver: (form.elements.namedItem('receiver') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
    };

    if (editingAddress) {
      setUserAddresses(userAddresses.map(addr => 
        addr.id === editingAddress.id ? formData : addr
      ));
    } else {
      setUserAddresses([...userAddresses, formData]);
    }

    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId: number) => {
    setUserAddresses(userAddresses.filter(addr => addr.id !== addressId));
  };

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

  const renderOrders = () => (
    <div className="space-y-4">
      {mockOrders.map((order) => (
        <div
          key={order.id}
          className="p-4 rounded-lg"
          style={{ backgroundColor: `${currentColor.primary}10` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold" style={{ color: currentColor.text }}>
                سفارش #{order.id}
              </h3>
              <p className="text-sm" style={{ color: currentColor.text }}>
                {order.date}
              </p>
            </div>
            <div>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: order.status === "تحویل شده" ? "#4CAF50" : currentColor.primary,
                  color: "white"
                }}
              >
                {order.status}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span style={{ color: currentColor.text }}>{item.name}</span>
                <span style={{ color: currentColor.text }}>×{item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span style={{ color: currentColor.primary }}>مجموع:</span>
            <span style={{ color: currentColor.primary }}>{order.total}</span>
          </div>
        </div>
      ))}
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
      <div className="min-h-screen bg-gray-50" style={{ backgroundColor: currentColor.background }}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}20` }}>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 flex items-center justify-center" style={{ borderColor: `${currentColor.primary}40`, backgroundColor: `${currentColor.primary}10` }}>
                    <i className="fa-solid fa-user text-4xl" style={{ color: currentColor.primary }}></i>
                  </div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: currentColor.text }}>{userData.fullName}</h2>
                  <p className="text-sm mb-3" style={{ color: `${currentColor.text}80` }}>{userData.email}</p>
                  <button 
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{ backgroundColor: `${currentColor.primary}15`, color: currentColor.primary }}
                    onClick={() => setActiveTab('edit-profile')}
                  >
                    <i className="fa-solid fa-pen-to-square ml-2"></i>
                    ویرایش پروفایل
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'profile', label: 'داشبورد', icon: 'fa-solid fa-gauge-high' },
                    { id: 'edit-profile', label: 'ویرایش پروفایل', icon: 'fa-solid fa-user-pen' },
                    { id: 'change-password', label: 'تغییر رمز عبور', icon: 'fa-solid fa-lock' },
                    { id: 'cart', label: 'سبد خرید', icon: 'fa-solid fa-cart-shopping' },
                    { id: 'orders', label: 'سفارش‌ها', icon: 'fa-solid fa-box' },
                    { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: 'fa-solid fa-heart' },
                    { id: 'addresses', label: 'آدرس‌ها', icon: 'fa-solid fa-location-dot' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                        activeTab === item.id ? 'text-white' : ''
                      }`}
                      style={{
                        backgroundColor: activeTab === item.id ? currentColor.primary : `${currentColor.primary}10`,
                        color: activeTab === item.id ? 'white' : currentColor.text
                      }}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <i className={`${item.icon} ml-3`}></i>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t" style={{ borderColor: `${currentColor.primary}20` }}>
                  <button 
                    className="w-full flex items-center px-4 py-3 rounded-lg mt-2 transition duration-200"
                    style={{ backgroundColor: '#ff000015', color: '#ff0000' }}
                  >
                    <i className="fa-solid fa-right-from-bracket ml-3"></i>
                    خروج از حساب
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { label: 'تعداد سفارشات', value: '12', icon: 'fa-solid fa-shopping-bag' },
                      { label: 'سفارشات در انتظار', value: '2', icon: 'fa-solid fa-clock' },
                      { label: 'کیف پول', value: '2,500,000 تومان', icon: 'fa-solid fa-wallet' },
                      { label: 'امتیاز شما', value: '850', icon: 'fa-solid fa-star' },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-6 flex items-center"
                        style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center ml-4"
                          style={{ backgroundColor: `${currentColor.primary}15` }}
                        >
                          <i className={`${stat.icon} text-xl`} style={{ color: currentColor.primary }}></i>
                        </div>
                        <div>
                          <p className="text-sm mb-1" style={{ color: `${currentColor.text}80` }}>{stat.label}</p>
                          <p className="text-lg font-bold" style={{ color: currentColor.text }}>{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Personal Info Card */}
                  <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold" style={{ color: currentColor.text }}>
                        <i className="fa-solid fa-user ml-2" style={{ color: currentColor.primary }}></i>
                        اطلاعات شخصی
                      </h3>
                      <button
                        className="px-4 py-2 rounded-lg text-sm transition duration-200"
                        style={{ backgroundColor: `${currentColor.primary}15`, color: currentColor.primary }}
                        onClick={() => setActiveTab('edit-profile')}
                      >
                        ویرایش اطلاعات
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'نام و نام خانوادگی', value: userData.fullName, icon: 'fa-solid fa-user' },
                        { label: 'پست الکترونیک', value: userData.email, icon: 'fa-solid fa-envelope' },
                        { label: 'شماره تماس', value: userData.phone, icon: 'fa-solid fa-phone' },
                        { label: 'تاریخ عضویت', value: '۱۴۰۲/۱۲/۲۵', icon: 'fa-solid fa-calendar' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center ml-4"
                            style={{ backgroundColor: `${currentColor.primary}15` }}
                          >
                            <i className={`${item.icon}`} style={{ color: currentColor.primary }}></i>
                          </div>
                          <div>
                            <p className="text-sm mb-1" style={{ color: `${currentColor.text}80` }}>{item.label}</p>
                            <p className="font-medium" style={{ color: currentColor.text }}>{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold" style={{ color: currentColor.text }}>
                        <i className="fa-solid fa-clock-rotate-left ml-2" style={{ color: currentColor.primary }}></i>
                        سفارشات اخیر
                      </h3>
                      <button
                        className="px-4 py-2 rounded-lg text-sm transition duration-200"
                        style={{ backgroundColor: `${currentColor.primary}15`, color: currentColor.primary }}
                        onClick={() => setActiveTab('orders')}
                      >
                        مشاهده همه
                      </button>
                    </div>
                    {mockOrders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-lg mb-4 last:mb-0"
                        style={{ backgroundColor: `${currentColor.primary}10` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium mb-1" style={{ color: currentColor.text }}>
                              سفارش #{order.id}
                            </h4>
                            <p className="text-sm" style={{ color: `${currentColor.text}80` }}>
                              {order.date}
                            </p>
                          </div>
                          <span
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: order.status === "تحویل شده" ? "#4CAF50" : currentColor.primary,
                              color: "white"
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span style={{ color: `${currentColor.text}80` }}>
                            {order.items.length} کالا
                          </span>
                          <span className="font-medium" style={{ color: currentColor.primary }}>
                            {order.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'edit-profile' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  <h2 className="text-lg font-bold mb-6" style={{ color: currentColor.text }}>
                    <i className="fa-solid fa-user-pen ml-2" style={{ color: currentColor.primary }}></i>
                    ویرایش اطلاعات کاربری
                  </h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleProfileUpdate({
                      fullName: e.currentTarget['fullName'].value,
                      email: e.currentTarget['email'].value,
                      phone: e.currentTarget['phone'].value,
                    });
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          نام و نام خانوادگی
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          defaultValue={userData.fullName}
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          پست الکترونیک
                        </label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={userData.email}
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          شماره تماس
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          defaultValue={userData.phone}
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-lg text-white transition-all duration-200"
                        style={{ backgroundColor: currentColor.primary }}
                      >
                        ذخیره تغییرات
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'change-password' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  <h2 className="text-lg font-bold mb-6" style={{ color: currentColor.text }}>
                    <i className="fa-solid fa-lock ml-2" style={{ color: currentColor.primary }}></i>
                    تغییر رمز عبور
                  </h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handlePasswordChange(
                      e.currentTarget['oldPassword'].value,
                      e.currentTarget['newPassword'].value
                    );
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          رمز عبور فعلی
                        </label>
                        <input
                          type="password"
                          name="oldPassword"
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                          تکرار رمز عبور جدید
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                          style={{ 
                            backgroundColor: `${currentColor.primary}10`,
                            color: currentColor.text,
                            borderColor: `${currentColor.primary}40`,
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-lg text-white transition-all duration-200"
                        style={{ backgroundColor: currentColor.primary }}
                      >
                        تغییر رمز عبور
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'cart' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  {checkoutStep > 0 && renderCheckoutSteps()}
                  {renderCartContent()}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  <h2 className="text-lg font-bold mb-6" style={{ color: currentColor.text }}>
                    <i className="fa-solid fa-box ml-2" style={{ color: currentColor.primary }}></i>
                    سفارش‌های من
                  </h2>
                  {renderOrders()}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  <h2 className="text-lg font-bold mb-6" style={{ color: currentColor.text }}>
                    <i className="fa-solid fa-heart ml-2" style={{ color: currentColor.primary }}></i>
                    علاقه‌مندی‌های من
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mockCartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-4"
                        style={{ backgroundColor: `${currentColor.primary}10` }}
                      >
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-semibold mb-2" style={{ color: currentColor.text }}>{item.name}</h3>
                        <div className="flex justify-between items-center">
                          <span style={{ color: currentColor.primary }}>{item.price}</span>
                          <button
                            className="text-red-500 hover:text-red-600"
                            aria-label="حذف از علاقه‌مندی‌ها"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white rounded-xl p-6" style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}10` }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold" style={{ color: currentColor.text }}>
                      <i className="fa-solid fa-location-dot ml-2" style={{ color: currentColor.primary }}></i>
                      آدرس‌های من
                    </h2>
                    <button
                      className="px-4 py-2 rounded-lg text-sm transition duration-200"
                      style={{ backgroundColor: currentColor.primary, color: 'white' }}
                      onClick={() => {
                        setEditingAddress(null);
                        setShowAddressForm(true);
                      }}
                    >
                      <i className="fa-solid fa-plus ml-2"></i>
                      افزودن آدرس جدید
                    </button>
                  </div>

                  {showAddressForm && (
                    <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${currentColor.primary}10` }}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: currentColor.text }}>
                        {editingAddress ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
                      </h3>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                              عنوان آدرس
                            </label>
                            <input
                              type="text"
                              name="title"
                              defaultValue={editingAddress?.title || ''}
                              className="w-full px-4 py-2 rounded-lg"
                              style={{ 
                                backgroundColor: `${currentColor.primary}15`,
                                color: currentColor.text,
                                borderColor: `${currentColor.primary}40`
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                              نام گیرنده
                            </label>
                            <input
                              type="text"
                              name="receiver"
                              defaultValue={editingAddress?.receiver || ''}
                              className="w-full px-4 py-2 rounded-lg"
                              style={{ 
                                backgroundColor: `${currentColor.primary}15`,
                                color: currentColor.text,
                                borderColor: `${currentColor.primary}40`
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                              شماره تماس
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              defaultValue={editingAddress?.phone || ''}
                              className="w-full px-4 py-2 rounded-lg"
                              style={{ 
                                backgroundColor: `${currentColor.primary}15`,
                                color: currentColor.text,
                                borderColor: `${currentColor.primary}40`
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm" style={{ color: currentColor.text }}>
                              آدرس کامل
                            </label>
                            <textarea
                              name="address"
                              defaultValue={editingAddress?.address || ''}
                              className="w-full px-4 py-2 rounded-lg"
                              style={{ 
                                backgroundColor: `${currentColor.primary}15`,
                                color: currentColor.text,
                                borderColor: `${currentColor.primary}40`
                              }}
                              rows={3}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="px-4 py-2 rounded-lg"
                            style={{ backgroundColor: `${currentColor.primary}20`, color: currentColor.text }}
                            onClick={() => {
                              setShowAddressForm(false);
                              setEditingAddress(null);
                            }}
                          >
                            انصراف
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-white"
                            style={{ backgroundColor: currentColor.primary }}
                          >
                            {editingAddress ? 'ویرایش آدرس' : 'افزودن آدرس'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userAddresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-4 rounded-lg relative group"
                        style={{ backgroundColor: `${currentColor.primary}10` }}
                      >
                        <div className="absolute left-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center ml-2"
                            style={{ backgroundColor: `${currentColor.primary}20`, color: currentColor.primary }}
                            onClick={() => handleEditAddress(address)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: '#ff000020', color: '#ff0000' }}
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                        <h3 className="font-semibold mb-2" style={{ color: currentColor.text }}>
                          {address.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: `${currentColor.text}80` }}>
                          {address.address}
                        </p>
                        <div className="flex items-center text-sm" style={{ color: `${currentColor.text}80` }}>
                          <span className="ml-4">
                            <i className="fa-solid fa-user ml-1"></i>
                            {address.receiver}
                          </span>
                          <span>
                            <i className="fa-solid fa-phone ml-1"></i>
                            {address.phone}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
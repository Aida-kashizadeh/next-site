"use client";
import Layout from "@/src/components/layout";
import { ThemeModeContext } from "@/src/contexts/themeMode";
import { colors } from "@/src/styles/theme/colors";
import { useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// Mock data - replace with your actual data source
const getProduct = (id: string) => ({
  id: parseInt(id),
  name: `محصول ${id}`,
  description: `توضیحات کامل محصول ${id} - این محصول دارای ویژگی‌های منحصر به فرد است که آن را از سایر محصولات متمایز می‌کند.`,
  price: `${parseInt(id) * 100},000 تومان`,
  image: `/product${id}.jpg`,
  rating: 4.5,
  reviewCount: 128,
  availability: "موجود در انبار",
  deliveryTime: "ارسال طی 2-3 روز کاری",
  warranty: "گارانتی 18 ماهه",
  features: [
    "کیفیت بالا",
    "قیمت مناسب",
    "گارانتی اصالت کالا",
    "پشتیبانی ۲۴/۷"
  ],
  specifications: {
    "برند": "برند اصلی",
    "کشور سازنده": "ایران",
    "مدل": `مدل ${id}`,
    "سال تولید": "1402"
  },
  reviews: [
    {
      id: 1,
      userName: "علی محمدی",
      rating: 5,
      date: "۱۴۰۲/۱۲/۱۵",
      comment: "کیفیت محصول عالی بود و بسته‌بندی مناسبی داشت. از خرید خودم کاملاً راضی هستم.",
      likes: 12
    },
    {
      id: 2,
      userName: "مریم احمدی",
      rating: 4,
      date: "۱۴۰۲/۱۲/۱۰",
      comment: "محصول خوبی بود اما قیمت کمی بالاست. با این حال از کیفیت راضی هستم.",
      likes: 8
    },
    {
      id: 3,
      userName: "رضا کریمی",
      rating: 5,
      date: "۱۴۰۲/۱۲/۰۵",
      comment: "ارسال سریع و بسته‌بندی عالی. حتماً باز هم خرید خواهم کرد.",
      likes: 15
    }
  ],
  relatedProducts: [
    { id: parseInt(id) + 1, name: `محصول ${parseInt(id) + 1}`, price: `${(parseInt(id) + 1) * 100},000 تومان`, image: `` },
    { id: parseInt(id) + 2, name: `محصول ${parseInt(id) + 2}`, price: `${(parseInt(id) + 2) * 100},000 تومان`, image: `` },
  ]
});

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const { theme } = useContext(ThemeModeContext);
  const currentColor = colors[theme];
  const params = useParams();
  const product = getProduct(params.id as string);

  // Schema.org data for product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    },
    "offers": {
      "@type": "Offer",
      "price": product.price.replace(/[^0-9]/g, ''),
      "priceCurrency": "IRR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "فروشگاه ما"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": product.specifications["برند"]
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`${product.name} | فروشگاه ما`}</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.specifications["برند"]}, ${product.name}, خرید آنلاین`} />
        <meta property="og:title" content={`${product.name} | فروشگاه ما`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://yourstore.com/products/${product.id}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>

      <main className="product-detail" itemScope itemType="https://schema.org/Product">
        <div className="h-[50px]"></div>
        
        <div className="container mx-auto px-4 py-12">
          <nav aria-label="breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 space-x-reverse text-sm">
              <li>
                <Link href="/" className="hover:underline" style={{ color: currentColor.text }}>
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <span className="mx-2" style={{ color: currentColor.text }}>/</span>
              </li>
              <li>
                <Link href="/products" className="hover:underline" style={{ color: currentColor.text }}>
                  محصولات
                </Link>
              </li>
              <li>
                <span className="mx-2" style={{ color: currentColor.text }}>/</span>
              </li>
              <li>
                <span style={{ color: currentColor.primary }}>{product.name}</span>
              </li>
            </ol>
          </nav>

          <Link href="/products">
            <button 
              style={{ 
                backgroundColor: currentColor.primary,
                color: currentColor.background
              }} 
              className="mb-8 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              aria-label="بازگشت به لیست محصولات"
            >
              بازگشت به لیست محصولات
            </button>
          </Link>

          <article style={{ backgroundColor: currentColor.background, boxShadow: `1px 1px 10px 3px ${currentColor.primary}` }} className="rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="product-gallery">
                <figure>
                  {/* <Image 
                    src={product.image} 
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full rounded-lg mb-4"
                    priority
                    itemProp="image"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x400";
                    }}
                  /> */}
                  <figcaption className="sr-only">{product.name}</figcaption>
                </figure>
                <div className="flex justify-center space-x-4 mt-4">
                  <button className="p-2 rounded-full" style={{ backgroundColor: currentColor.primary }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full" style={{ backgroundColor: currentColor.primary }}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <h1 
                  style={{ color: currentColor.text }} 
                  className="text-3xl font-bold mb-2"
                  itemProp="name"
                >
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <StarRating rating={product.rating} />
                    <meta itemProp="ratingValue" content={product.rating.toString()} />
                    <meta itemProp="reviewCount" content={product.reviewCount.toString()} />
                    <span style={{ color: currentColor.text }} className="mr-2">
                      ({product.rating} / 5) - {product.reviewCount} نظر
                    </span>
                  </div>
                </div>

                <meta itemProp="description" content={product.description} />
                <p style={{ color: currentColor.text }} className="mb-6 text-lg">
                  {product.description}
                </p>

                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: currentColor.primary + '20' }}>
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="IRR" />
                    <meta itemProp="price" content={product.price.replace(/[^0-9]/g, '')} />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <p style={{ color: currentColor.primary }} className="text-2xl font-bold mb-2">
                      {product.price}
                    </p>
                  </div>
                  <p style={{ color: currentColor.text }} className="text-sm">
                    <span className="ml-2">{product.availability}</span>
                    <span className="mx-2">|</span>
                    <span>{product.deliveryTime}</span>
                  </p>
                </div>
                
                <section className="mb-6">
                  <h2 style={{ color: currentColor.text }} className="text-xl font-semibold mb-4">
                    مشخصات محصول:
                  </h2>
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt style={{ color: currentColor.text }} className="font-medium">{key}:</dt>
                        <dd style={{ color: currentColor.text }}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button 
                    style={{ 
                      backgroundColor: currentColor.primary,
                      color: currentColor.background
                    }} 
                    className="py-3 rounded-lg text-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    افزودن به سبد خرید
                  </button>
                  <button 
                    style={{ 
                      backgroundColor: 'transparent',
                      color: currentColor.primary,
                      border: `2px solid ${currentColor.primary}`
                    }} 
                    className="py-3 rounded-lg text-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    درخواست مشاوره
                  </button>
                </div>
              </div>
            </div>

            {/* Support and Contact Section */}
            <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="پشتیبانی و تماس">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentColor.primary + '10' }}>
                <svg className="w-8 h-8 mx-auto mb-2" style={{ color: currentColor.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h4 style={{ color: currentColor.text }} className="font-bold">پشتیبانی تلفنی</h4>
                <p style={{ color: currentColor.text }}>۷ روز هفته - ۲۴ ساعته</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentColor.primary + '10' }}>
                <svg className="w-8 h-8 mx-auto mb-2" style={{ color: currentColor.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h4 style={{ color: currentColor.text }} className="font-bold">چت آنلاین</h4>
                <p style={{ color: currentColor.text }}>پاسخگویی سریع</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: currentColor.primary + '10' }}>
                <svg className="w-8 h-8 mx-auto mb-2" style={{ color: currentColor.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h4 style={{ color: currentColor.text }} className="font-bold">پشتیبانی ایمیل</h4>
                <p style={{ color: currentColor.text }}>پاسخ در کمتر از ۲۴ ساعت</p>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="mt-12" aria-label="نظرات کاربران">
              <header className="flex justify-between items-center mb-6">
                <h2 style={{ color: currentColor.text }} className="text-2xl font-bold">
                  نظرات کاربران
                </h2>
                <button
                  style={{
                    backgroundColor: currentColor.primary,
                    color: currentColor.background
                  }}
                  className="px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="ثبت نظر جدید"
                >
                  ثبت نظر جدید
                </button>
              </header>

              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <article
                    key={review.id}
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: currentColor.primary + '10' }}
                    itemProp="review"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <meta itemProp="datePublished" content={review.date} />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 style={{ color: currentColor.text }} className="font-bold text-lg mb-1" itemProp="author">
                          {review.userName}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                            <meta itemProp="ratingValue" content={review.rating.toString()} />
                            <StarRating rating={review.rating} />
                          </div>
                          <time style={{ color: currentColor.text }} className="text-sm" dateTime={review.date}>
                            {review.date}
                          </time>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: currentColor.primary + '20',
                          color: currentColor.primary
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        {review.likes}
                      </button>
                    </div>
                    <p style={{ color: currentColor.text }} className="text-base leading-relaxed" itemProp="reviewBody">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  style={{ color: currentColor.primary }}
                  className="text-lg font-medium hover:underline"
                >
                  مشاهده همه نظرات ({product.reviewCount})
                </button>
              </div>
            </section>

            {/* Related Products Section */}
            <section className="mt-12" aria-label="محصولات مرتبط">
              <h2 style={{ color: currentColor.text }} className="text-2xl font-bold mb-6">
                محصولات مرتبط
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.relatedProducts.map((relatedProduct) => (
                  <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                    <article 
                      className="p-4 rounded-lg transition-transform hover:scale-105" 
                      style={{ backgroundColor: currentColor.primary + '10' }}
                    >
                      {/* <Image 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200";
                        }}
                      /> */}
                      <h3 style={{ color: currentColor.text }} className="font-bold mb-2">{relatedProduct.name}</h3>
                      <p style={{ color: currentColor.primary }}>{relatedProduct.price}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </Layout>
  );
} 
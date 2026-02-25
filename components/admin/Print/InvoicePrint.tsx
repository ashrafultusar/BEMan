import React from 'react';

interface InvoiceProps {
  order: any;
}

const InvoicePrint: React.FC<InvoiceProps> = ({ order }) => {
  return (
    <div className="print-only bg-white p-0 text-black font-sans min-h-screen relative">
      {/* 🟢 Top Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-8 bg-[#3b82f6] opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      <div className="absolute top-0 left-0 w-48 h-12 bg-[#1e293b]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>

      <div className="p-12">
        {/* 🟢 Header Section */}
        <div className=" mb-10">
          <h1 className="text-6xl font-black tracking-tight text-black">INVOICE</h1>
          
        </div>

        {/* 🟢 Bill To & Invoice Details */}
        <div className="flex justify-between mb-12">
          <div className="space-y-1">
            <h3 className="text-2xl font-black mb-3">Bill To:</h3>
            <p className="text-sm font-bold text-gray-700">Client Name: <span className="text-black ml-1">{order.customerName}</span></p>
            <p className="text-sm font-bold text-gray-700">Billing Address: <span className="text-black ml-1">{order.address}</span></p>
            <p className="text-sm font-bold text-gray-700">Phone: <span className="text-black ml-1">{order.phoneNumber}</span></p>
            <p className="text-sm font-bold text-gray-700">Email: <span className="text-black ml-1">{order.customerEmail || 'customer@example.com'}</span></p>
          </div>
          <div className="text-right flex flex-col justify-end space-y-1">
            <p className="text-sm font-bold text-gray-700">Invoice Number: <span className="text-black ml-2">#{order.orderId}</span></p>
            <p className="text-sm font-bold text-gray-700">Invoice Date: <span className="text-black ml-2">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></p>
          </div>
        </div>

        {/* 🟢 Table Section */}
        <div className="mb-8">
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Order Details:</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#fbbf24] text-black">
                <th className="py-3 px-4 text-left text-xs font-black uppercase">No</th>
                <th className="py-3 px-4 text-left text-xs font-black uppercase">Description of Service</th>
                <th className="py-3 px-4 text-center text-xs font-black uppercase">Quantity</th>
                <th className="py-3 px-4 text-right text-xs font-black uppercase">Rate (৳)</th>
                <th className="py-3 px-4 text-right text-xs font-black uppercase">Total (৳)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: any, i: number) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-4 text-sm font-black text-center border-b border-gray-100">{i + 1}</td>
                  <td className="py-4 px-4 text-sm font-bold border-b border-gray-100 text-[#1e293b]">{item.name}</td>
                  <td className="py-4 px-4 text-sm text-center border-b border-gray-100">{item.quantity} item</td>
                  <td className="py-4 px-4 text-sm text-right border-b border-gray-100 font-medium">৳{item.price.toFixed(2)}</td>
                  <td className="py-4 px-4 text-sm text-right border-b border-gray-100 font-bold">৳{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🟢 Summary Section */}
        <div className="flex justify-end mb-16">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm font-bold text-gray-600">
              <span>Subtotal</span>
              <span className="text-black">৳{(order.totalAmount - (order.deliveryCharge || 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-black">৳{(order.deliveryCharge || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-y-2 border-gray-200">
              <span className="text-md font-black uppercase tracking-tighter">Total Amount</span>
              <span className="text-xl font-black text-black">৳{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 🟢 Payment & Footer Section (Blue Bar Style) */}
        <div className="mt-10 border-t-8 border-[#1e293b]">
          <div className="bg-[#1e293b] text-white p-6 flex justify-between items-start">
            <div>
              <h4 className="text-lg font-black uppercase mb-3">Payment Information:</h4>
              <div className="text-[11px] space-y-1 font-medium opacity-90">
                <p>Payment Method: Cash On Delivery</p>
                <p>Status: {order.status}</p>
                <p>Order ID: {order.orderId}</p>
              </div>
            </div>
            <div className="text-right">
               <h4 className="text-lg font-black uppercase mb-3 underline decoration-[#fbbf24]">Questions?</h4>
               <p className="text-[11px] font-bold">Email: info@bemen.com</p>
               <p className="text-[11px] font-bold">Call Us: +880 1XXX-XXXXXX</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-12 px-6">
            <div className="text-left italic text-gray-400 text-xs">
              "Wear Bemen to be Men"
            </div>
            <div className="flex flex-col items-center">
               <div className="w-32 h-[1px] bg-black mb-2"></div>
               <p className="text-sm font-black">Authorized Signature</p>
               <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">BEMEN CLOTHING</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 Bottom Corner Accent */}
      <div className="absolute bottom-0 right-0 w-32 h-12 bg-[#3b82f6] opacity-30" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
      <div className="absolute bottom-0 right-0 w-16 h-8 bg-[#1e293b]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
    </div>
  );
};

export default InvoicePrint;
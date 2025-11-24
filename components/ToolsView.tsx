import React, { useState } from 'react';
import { FLIGHT_INFO, EMERGENCY_NUMBERS } from '../constants';
import { Expense } from '../types';
import { Plane, Phone, Wallet, Hotel, Plus, Trash2 } from 'lucide-react';

const ToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'budget'>('info');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addExpense = () => {
    if (!newItem || !newAmount) return;
    const expense: Expense = {
      id: Date.now().toString(),
      item: newItem,
      amount: parseFloat(newAmount),
      currency: 'JPY',
      category: 'General'
    };
    setExpenses([...expenses, expense]);
    setNewItem('');
    setNewAmount('');
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="pb-24 pt-4 px-4">
      {/* Sub-tabs */}
      <div className="flex p-1 bg-stone-200 rounded-lg mb-6">
        <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500'}`}
            onClick={() => setActiveTab('info')}
        >
            資訊與航班
        </button>
        <button 
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'budget' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500'}`}
            onClick={() => setActiveTab('budget')}
        >
            預算與記帳
        </button>
      </div>

      {activeTab === 'info' ? (
        <div className="space-y-6">
          {/* Flights */}
          <section>
            <h3 className="font-serif font-bold text-xl mb-3 flex items-center gap-2 text-jp-indigo">
                <Plane size={20} /> 航班資訊
            </h3>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 space-y-4">
                <div className="border-b border-stone-100 pb-3">
                    <span className="text-xs font-bold text-stone-400">去程 OUTBOUND</span>
                    <div className="flex justify-between items-end">
                        <div className="text-xl font-bold">{FLIGHT_INFO.outbound.code}</div>
                        <div className="text-sm text-stone-600">{FLIGHT_INFO.outbound.airline}</div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                        <span>{FLIGHT_INFO.outbound.dep}</span>
                        <span className="text-stone-400">→</span>
                        <span>{FLIGHT_INFO.outbound.arr}</span>
                    </div>
                </div>
                <div>
                    <span className="text-xs font-bold text-stone-400">回程 INBOUND</span>
                    <div className="flex justify-between items-end">
                        <div className="text-xl font-bold">{FLIGHT_INFO.inbound.code}</div>
                        <div className="text-sm text-stone-600">{FLIGHT_INFO.inbound.airline}</div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                        <span>{FLIGHT_INFO.inbound.dep}</span>
                        <span className="text-stone-400">→</span>
                        <span>{FLIGHT_INFO.inbound.arr}</span>
                    </div>
                </div>
            </div>
          </section>

          {/* Emergency */}
          <section>
             <h3 className="font-serif font-bold text-xl mb-3 flex items-center gap-2 text-jp-red">
                <Phone size={20} /> 緊急聯絡
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {EMERGENCY_NUMBERS.map((em, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-stone-100 shadow-sm flex flex-col items-center text-center">
                        <span className="text-xs text-stone-500 mb-1">{em.name}</span>
                        <span className="text-lg font-bold text-jp-red">{em.number}</span>
                    </div>
                ))}
            </div>
          </section>

           {/* Hotels */}
           <section>
             <h3 className="font-serif font-bold text-xl mb-3 flex items-center gap-2 text-stone-700">
                <Hotel size={20} /> 住宿資訊
            </h3>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                    <div className="font-bold min-w-[60px]">東京</div>
                    <div className="text-stone-600">VIA INN 秋葉原 JR 西日本集團</div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="font-bold min-w-[60px]">輕井澤</div>
                    <div className="text-stone-600">輕井澤渴望之家飯店 (Longing House)</div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="font-bold min-w-[60px]">四萬</div>
                    <div className="text-stone-600">四萬溫泉 柏屋旅館</div>
                </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
            {/* Total Card */}
            <div className="bg-jp-indigo text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wallet size={100} />
                </div>
                <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">總支出</p>
                <h2 className="text-4xl font-serif font-bold mt-1">¥ {totalSpent.toLocaleString()}</h2>
            </div>

            {/* Add New */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <h4 className="font-bold text-stone-700 mb-3 text-sm">新增支出</h4>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="項目 (例如：拉麵)"
                        className="flex-[2] bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jp-indigo"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                    />
                     <input 
                        type="number" 
                        placeholder="¥ 金額"
                        className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jp-indigo"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                    />
                    <button 
                        onClick={addExpense}
                        className="bg-jp-indigo text-white p-2 rounded-lg"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-2">
                {expenses.length === 0 ? (
                    <div className="text-center text-stone-400 py-8 italic text-sm">尚未有支出紀錄</div>
                ) : (
                    expenses.map(exp => (
                        <div key={exp.id} className="bg-white p-3 rounded-lg border border-stone-100 flex justify-between items-center">
                            <span className="text-stone-700 font-medium">{exp.item}</span>
                            <div className="flex items-center gap-3">
                                <span className="font-bold font-serif">¥{exp.amount.toLocaleString()}</span>
                                <button onClick={() => setExpenses(expenses.filter(e => e.id !== exp.id))} className="text-stone-300 hover:text-red-400">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default ToolsView;
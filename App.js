import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  SafeAreaView,
} from 'react-native';

const toBn = (v) =>
  String(v ?? '').replace(/\d/g, (d) => ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'][Number(d)]);

const VEHICLES = [
  { id: 'auto', name: 'অটো', seats: '৭ সিট', icon: '🛺', minFare: 25 },
  { id: 'cng', name: 'সিএনজি', seats: '৫ সিট', icon: '🚖', minFare: 40 },
  { id: 'bike', name: 'মোটরবাইক', seats: '২ সিট', icon: '🏍️', minFare: 30 },
];

const UPAZILAS = ['ফরিদগঞ্জ', 'চাঁদপুর সদর', 'রায়পুর', 'লক্ষ্মীপুর সদর', 'হাইমচর'];
const PLACES = ['ফরিদগঞ্জ বাজার', 'পাইলট উচ্চ বিদ্যালয়', 'মজিদিয়া মাদ্রাসা', 'স্বাস্থ্য কমপ্লেক্স'];
const CANCEL_FINE = 15;

export default function App() {
  const [screen, setScreen] = useState('ENTRY');
  const [taps, setTaps] = useState(0);
  const [pin, setPin] = useState('');
  const [bonus, setBonus] = useState(100);
  const [adminBal, setAdminBal] = useState(450);

  const [cPhone, setCPhone] = useState('01711111111');
  const [cDue, setCDue] = useState(15);
  const [area, setArea] = useState('ফরিদগঞ্জ');
  const [veh, setVeh] = useState(VEHICLES[0]);
  const [pickup, setPickup] = useState(PLACES[0]);
  const [dest, setDest] = useState(PLACES[3]);
  const [field, setField] = useState('pickup');
  const [fare, setFare] = useState('25');
  const [tip, setTip] = useState(0);
  const [stars, setStars] = useState(5);

  const [chats, setChats] = useState([
    { id: '1', by: 'RIDER', txt: 'আসসালামু আলাইকুম! আমি ২ মিনিটে পিকআপ পয়েন্টে আসছি।' },
  ]);
  const [chatMsg, setChatMsg] = useState('');

  const [rPhone, setRPhone] = useState('01811111111');
  const [rPass, setRPass] = useState('password123');
  const [rBal, setRBal] = useState(100);
  const [online, setOnline] = useState(true);
  const [hasReq, setHasReq] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [rName, setRName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [newPass, setNewPass] = useState('');

  const baseFare = Number(fare) || 0;
  const subTotal = baseFare + cDue;
  const totalPay = subTotal + tip;
  const fee = baseFare > 0 ? Math.max(5, Math.round(baseFare * 0.08)) : 0;

  const tapLogo = () => {
    if (taps + 1 >= 5) {
      setTaps(0);
      setPin('');
      setScreen('ADMIN_LOGIN');
    } else {
      setTaps(taps + 1);
    }
  };

  const sendChat = (by) => {
    if (!chatMsg.trim()) return;
    setChats([...chats, { id: String(Date.now()), by, txt: chatMsg.trim() }]);
    setChatMsg('');
  };

  /* ---------------- ENTRY ---------------- */
  if (screen === 'ENTRY') {
    return (
      <SafeAreaView style={s.center}>
        <TouchableOpacity onPress={tapLogo}>
          <Text style={s.title}>গ্রামের গাড়ি 🛺</Text>
        </TouchableOpacity>
        <Text style={s.sub}>ফরিদগঞ্জ • চাঁদপুর • রায়পুর • লক্ষ্মীপুর • হাইমচর</Text>

        <View style={s.card}>
          <Text style={s.h2}>আপনি কীভাবে অ্যাপটি ব্যবহার করবেন?</Text>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#16a34a' }]} onPress={() => setScreen('C_LOGIN')}>
            <Text style={s.btnTxt}>১. কাস্টমার (Customer)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: '#2563eb' }]} onPress={() => setScreen('R_LOGIN')}>
            <Text style={s.btnTxt}>২. রাইডার (নতুন অ্যাকাউন্টে {toBn(bonus)}৳ বোনাস!)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ---------------- ADMIN ---------------- */
  if (screen === 'ADMIN_LOGIN') {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.title}>অ্যাডমিন প্যানেল 🔐</Text>
        <View style={s.card}>
          <Text style={s.lbl}>পিন দিন (১২৩৪)</Text>
          <TextInput style={s.input} value={pin} onChangeText={setPin} keyboardType="number-pad" secureTextEntry />
          <TouchableOpacity
            style={[s.btn, { backgroundColor: '#0f172a' }]}
            onPress={() => (pin === '1234' ? setScreen('ADMIN') : Alert.alert('ভুল পিন', 'সঠিক পিন ১২৩৪ দিন'))}>
            <Text style={s.btnTxt}>প্রবেশ করুন</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('ENTRY')}>
          <Text style={s.back}>← ফিরে যান</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'ADMIN') {
    return (
      <ScrollView style={s.page}>
        <View style={s.row}>
          <Text style={s.h1}>অ্যাডমিন ড্যাশবোর্ড 🛡️</Text>
          <TouchableOpacity onPress={() => setScreen('ENTRY')}>
            <Text style={{ color: '#dc2626', fontWeight: 'bold' }}>বের হন</Text>
          </TouchableOpacity>
        </View>
        <View style={s.card}>
          <Text style={s.h2}>মোট আয়: {toBn(adminBal)}৳</Text>
          <Text style={s.lbl}>নতুন রাইডার ফ্রি বোনাস (৳):</Text>
          <TextInput
            style={s.input}
            keyboardType="number-pad"
            value={String(bonus)}
            onChangeText={(v) => setBonus(Number(v) || 0)}
          />
          <Text style={s.info}>অফিসিয়াল bKash: 01700-111111</Text>
          <Text style={s.info}>অফিসিয়াল Nagad: 01800-222222</Text>
        </View>
      </ScrollView>
    );
  }

  /* ---------------- CUSTOMER ---------------- */
  if (screen === 'C_LOGIN') {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.title}>কাস্টমার লগইন 📱</Text>
        <View style={s.card}>
          <Text style={s.lbl}>মোবাইল নম্বর</Text>
          <TextInput style={s.input} value={cPhone} onChangeText={setCPhone} keyboardType="phone-pad" />
          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              setTip(0);
              setFare(String(veh.minFare));
              setScreen('C_BOOK');
            }}>
            <Text style={s.btnTxt}>প্রবেশ করুন</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('ENTRY')}>
          <Text style={s.back}>← ফিরে যান</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'C_BOOK') {
    return (
      <ScrollView style={s.page}>
        <Text style={s.title}>গ্রামের গাড়ি 🛺</Text>
        {cDue > 0 && (
          <View style={s.warn}>
            <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>
              ⚠️ পূর্ববর্তী বাতিলের {toBn(cDue)}৳ জরিমানা বকেয়া আছে।
            </Text>
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 8 }}>
          {UPAZILAS.map((u) => (
            <TouchableOpacity
              key={u}
              style={[s.chip, area === u && s.chipOn, { marginRight: 8 }]}
              onPress={() => setArea(u)}>
              <Text style={[s.chipTxt, area === u && { color: '#fff' }]}>{u}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={s.lbl}>গাড়ি ও আসন সংখ্যা বাছুন:</Text>
        <View style={s.grid}>
          {VEHICLES.map((v) => {
            const active = veh.id === v.id;
            return (
              <TouchableOpacity
                key={v.id}
                style={[s.vCard, active && s.vCardOn]}
                onPress={() => {
                  setVeh(v);
                  setFare(String(v.minFare));
                }}>
                <View style={s.row}>
                  <Text style={{ fontSize: 22 }}>{v.icon}</Text>
                  <Text style={s.seat}>💺 {v.seats}</Text>
                </View>
                <Text style={s.vTitle}>{v.name}</Text>
                <Text style={{ fontSize: 12, color: '#64748b' }}>শুরু {toBn(v.minFare)}৳</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.card}>
          <Text style={s.lbl}>পিকআপ ({area})</Text>
          <TextInput style={s.input} value={pickup} onChangeText={setPickup} onFocus={() => setField('pickup')} />
          <Text style={s.lbl}>গন্তব্য</Text>
          <TextInput style={s.input} value={dest} onChangeText={setDest} onFocus={() => setField('dest')} />

          <View style={s.wrap}>
            {PLACES.map((p) => (
              <TouchableOpacity
                key={p}
                style={s.chip}
                onPress={() => (field === 'pickup' ? setPickup(p) : setDest(p))}>
                <Text style={{ fontSize: 11 }}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.lbl}>ভাড়া (সর্বনিম্ন {toBn(veh.minFare)}৳)</Text>
          <TextInput style={s.input} value={fare} onChangeText={setFare} keyboardType="number-pad" />

          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              if (baseFare < veh.minFare) {
                Alert.alert('সর্বনিম্ন ভাড়া', `কমপক্ষে ${toBn(veh.minFare)}৳ দিন`);
                setFare(String(veh.minFare));
                return;
              }
              setAccepted(false);
              setHasReq(true);
              setScreen('C_RIDE');
            }}>
            <Text style={s.btnTxt}>
              {veh.name} ({veh.seats}) বুক করুন ({toBn(subTotal)}৳)
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setScreen('ENTRY')}>
          <Text style={s.back}>← লগআউট</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === 'C_RIDE') {
    return (
      <ScrollView style={s.page}>
        <Text style={s.h1}>
          আপনার {veh.name} ({veh.seats}) আসছে... {veh.icon}
        </Text>
        <View style={s.card}>
          <Text style={s.h2}>চালক: মোঃ করিম মিয়া (⭐ ৪.৯)</Text>
          <Text style={s.info}>📱 01811111111 | গাড়ি: চাঁদপুর-থ-১২৩৪</Text>
          <View style={[s.row, { marginTop: 10 }]}>
            <TouchableOpacity
              style={[s.sBtn, { backgroundColor: '#16a34a' }]}
              onPress={() => Alert.alert('কল 📞', '01811111111')}>
              <Text style={s.btnTxt}>📞 কল</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.sBtn, { backgroundColor: '#2563eb' }]} onPress={() => setScreen('C_CHAT')}>
              <Text style={s.btnTxt}>💬 চ্যাট</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.info}>📍 পিকআপ: {pickup}</Text>
          <Text style={s.info}>🏁 গন্তব্য: {dest}</Text>
          <Text style={[s.h2, { marginTop: 6 }]}>মোট ভাড়া: {toBn(subTotal)}৳</Text>
        </View>

        <TouchableOpacity style={s.btn} onPress={() => setScreen('C_RATE')}>
          <Text style={s.btnTxt}>গন্তব্যে পৌঁছেছি (ট্রিপ শেষ)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.btn, { backgroundColor: '#dc2626' }]}
          onPress={() =>
            Alert.alert('রাইড বাতিল', `বাতিল করলে ${toBn(CANCEL_FINE)}৳ জরিমানা হবে। বাতিল করবেন?`, [
              { text: 'না', style: 'cancel' },
              {
                text: 'হ্যাঁ, বাতিল',
                style: 'destructive',
                onPress: () => {
                  setCDue(cDue + CANCEL_FINE);
                  setScreen('C_BOOK');
                },
              },
            ])
          }>
          <Text style={s.btnTxt}>রাইড বাতিল করুন</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === 'C_CHAT') {
    return (
      <SafeAreaView style={s.page}>
        <View style={s.row}>
          <Text style={s.h1}>চালকের সাথে চ্যাট 💬</Text>
        </View>
        <ScrollView style={s.chatBox}>
          {chats.map((c) => (
            <View key={c.id} style={[s.bubble, c.by === 'CUSTOMER' ? s.bRight : s.bLeft]}>
              <Text style={{ color: c.by === 'CUSTOMER' ? '#fff' : '#0f172a' }}>{c.txt}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={s.row}>
          <TextInput
            style={[s.input, { flex: 1, marginRight: 8, marginBottom: 0 }]}
            value={chatMsg}
            onChangeText={setChatMsg}
            placeholder="মেসেজ লিখুন..."
          />
          <TouchableOpacity style={s.send} onPress={() => sendChat('CUSTOMER')}>
            <Text style={s.btnTxt}>পাঠান</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('C_RIDE')}>
          <Text style={s.back}>← রাইডে ফিরুন</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'C_RATE') {
    return (
      <ScrollView style={s.page}>
        <Text style={s.h1}>ট্রিপ শেষ ✅</Text>
        <View style={s.card}>
          <Text style={s.info}>ভাড়া: {toBn(baseFare)}৳</Text>
          {cDue > 0 && <Text style={s.info}>পূর্বের জরিমানা: {toBn(cDue)}৳</Text>}
          <Text style={s.info}>টিপ: {toBn(tip)}৳</Text>
          <Text style={[s.h2, { marginTop: 8 }]}>মোট দিতে হবে: {toBn(totalPay)}৳</Text>
        </View>

        <View style={s.card}>
          <Text style={s.lbl}>চালককে টিপ দিন (ঐচ্ছিক):</Text>
          <View style={s.wrap}>
            {[0, 5, 10, 20].map((t) => (
              <TouchableOpacity key={t} style={[s.chip, tip === t && s.chipOn]} onPress={() => setTip(t)}>
                <Text style={[s.chipTxt, tip === t && { color: '#fff' }]}>{t === 0 ? 'টিপ নেই' : `${toBn(t)}৳`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.lbl}>রেটিং দিন:</Text>
          <View style={s.row}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setStars(n)}>
                <Text style={{ fontSize: 32 }}>{n <= stars ? '⭐' : '☆'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={s.btn}
          onPress={() => {
            setAdminBal(adminBal + fee);
            setRBal(Math.max(0, rBal - fee));
            setCDue(0);
            setTip(0);
            setStars(5);
            Alert.alert('ধন্যবাদ! 🙏', `${toBn(totalPay)}৳ চালককে নগদে দিন।`);
            setScreen('C_BOOK');
          }}>
          <Text style={s.btnTxt}>সম্পন্ন করুন</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  /* ---------------- RIDER ---------------- */
  if (screen === 'R_LOGIN') {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.title}>রাইডার লগইন 🛺</Text>
        <View style={s.card}>
          <Text style={s.lbl}>মোবাইল নম্বর</Text>
          <TextInput style={s.input} value={rPhone} onChangeText={setRPhone} keyboardType="phone-pad" />
          <Text style={s.lbl}>পাসওয়ার্ড</Text>
          <TextInput style={s.input} value={rPass} onChangeText={setRPass} secureTextEntry />
          <TouchableOpacity
            style={[s.btn, { backgroundColor: '#2563eb' }]}
            onPress={() => {
              if (!rPhone || !rPass) {
                Alert.alert('তথ্য দিন', 'মোবাইল নম্বর ও পাসওয়ার্ড দিন');
                return;
              }
              setScreen('R_HOME');
            }}>
            <Text style={s.btnTxt}>প্রবেশ করুন</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOtp('');
              setOtpSent(false);
              setNewPass('');
              setScreen('R_FORGOT');
            }}>
            <Text style={[s.back, { marginVertical: 8 }]}>পাসওয়ার্ড ভুলে গেছেন?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: '#f59e0b' }]}
            onPress={() => {
              setRName('');
              setRPhone('');
              setRPass('');
              setScreen('R_SIGNUP');
            }}>
            <Text style={s.btnTxt}>নতুন অ্যাকাউন্ট খুলুন (+{toBn(bonus)}৳ বোনাস)</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('ENTRY')}>
          <Text style={s.back}>← ফিরে যান</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'R_SIGNUP') {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.title}>নতুন রাইডার অ্যাকাউন্ট 🛺</Text>
        <View style={s.card}>
          <Text style={s.lbl}>আপনার নাম</Text>
          <TextInput style={s.input} value={rName} onChangeText={setRName} />
          <Text style={s.lbl}>মোবাইল নম্বর</Text>
          <TextInput style={s.input} value={rPhone} onChangeText={setRPhone} keyboardType="phone-pad" />
          <Text style={s.lbl}>পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)</Text>
          <TextInput style={s.input} value={rPass} onChangeText={setRPass} secureTextEntry />
          <TouchableOpacity
            style={[s.btn, { backgroundColor: '#2563eb' }]}
            onPress={() => {
              if (!rName.trim() || rPhone.length < 11 || rPass.length < 6) {
                Alert.alert('তথ্য ঠিক নয়', 'নাম, ১১ সংখ্যার মোবাইল নম্বর ও ৬ অক্ষরের পাসওয়ার্ড দিন');
                return;
              }
              setRBal(bonus);
              Alert.alert('স্বাগতম! 🎉', `আপনার অ্যাকাউন্ট খোলা হয়েছে। ${toBn(bonus)}৳ বোনাস পেয়েছেন।`);
              setScreen('R_HOME');
            }}>
            <Text style={s.btnTxt}>অ্যাকাউন্ট খুলুন</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('R_LOGIN')}>
          <Text style={s.back}>← লগইনে ফিরুন</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'R_FORGOT') {
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.title}>পাসওয়ার্ড ভুলে গেছেন? 🔑</Text>
        <View style={s.card}>
          <Text style={s.lbl}>মোবাইল নম্বর</Text>
          <TextInput style={s.input} value={rPhone} onChangeText={setRPhone} keyboardType="phone-pad" />

          {!otpSent ? (
            <TouchableOpacity
              style={[s.btn, { backgroundColor: '#2563eb' }]}
              onPress={() => {
                if (rPhone.length < 11) {
                  Alert.alert('নম্বর ভুল', '১১ সংখ্যার মোবাইল নম্বর দিন');
                  return;
                }
                setOtpSent(true);
                Alert.alert('কোড পাঠানো হয়েছে 📩', 'ডেমো কোড: ১২৩৪৫৬');
              }}>
              <Text style={s.btnTxt}>কোড পাঠান</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={s.lbl}>এসএমএসে পাওয়া ৬ সংখ্যার কোড</Text>
              <TextInput style={s.input} value={otp} onChangeText={setOtp} keyboardType="number-pad" />
              <Text style={s.lbl}>নতুন পাসওয়ার্ড</Text>
              <TextInput style={s.input} value={newPass} onChangeText={setNewPass} secureTextEntry />
              <TouchableOpacity
                style={[s.btn, { backgroundColor: '#2563eb' }]}
                onPress={() => {
                  if (otp !== '123456') {
                    Alert.alert('ভুল কোড', 'সঠিক কোড দিন');
                    return;
                  }
                  if (newPass.length < 6) {
                    Alert.alert('পাসওয়ার্ড ছোট', 'কমপক্ষে ৬ অক্ষর দিন');
                    return;
                  }
                  setRPass(newPass);
                  Alert.alert('সফল ✅', 'পাসওয়ার্ড বদলানো হয়েছে। এবার লগইন করুন।');
                  setScreen('R_LOGIN');
                }}>
                <Text style={s.btnTxt}>পাসওয়ার্ড বদলান</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => setScreen('R_LOGIN')}>
          <Text style={s.back}>← লগইনে ফিরুন</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (screen === 'R_HOME') {
    return (
      <ScrollView style={s.page}>
        <View style={s.row}>
          <Text style={s.h1}>রাইডার ড্যাশবোর্ড</Text>
          <TouchableOpacity onPress={() => setScreen('ENTRY')}>
            <Text style={{ color: '#dc2626', fontWeight: 'bold' }}>বের হন</Text>
          </TouchableOpacity>
        </View>

        <View style={s.card}>
          <Text style={s.h2}>ব্যালেন্স: {toBn(rBal)}৳</Text>
          <View style={[s.row, { marginTop: 8 }]}>
            <Text style={s.lbl}>{online ? '🟢 অনলাইন' : '🔴 অফলাইন'}</Text>
            <Switch value={online} onValueChange={setOnline} />
          </View>
        </View>

        {!online && (
          <View style={s.card}>
            <Text style={s.info}>রাইড পেতে অনলাইন হন।</Text>
          </View>
        )}

        {online && hasReq && (
          <View style={s.card}>
            <Text style={s.h2}>নতুন রাইড রিকোয়েস্ট! 🔔</Text>
            <Text style={s.info}>
              {veh.icon} {veh.name} ({veh.seats})
            </Text>
            <Text style={s.info}>📍 পিকআপ: {pickup}</Text>
            <Text style={s.info}>🏁 গন্তব্য: {dest}</Text>
            <Text style={s.info}>💰 ভাড়া: {toBn(baseFare)}৳</Text>
            <Text style={s.info}>প্ল্যাটফর্ম ফি: {toBn(fee)}৳</Text>

            {!accepted ? (
              <View style={[s.row, { marginTop: 10 }]}>
                <TouchableOpacity
                  style={[s.sBtn, { backgroundColor: '#16a34a' }]}
                  onPress={() => {
                    if (rBal < fee) {
                      Alert.alert('ব্যালেন্স কম', 'রাইড নিতে ব্যালেন্স রিচার্জ করুন।');
                      return;
                    }
                    setAccepted(true);
                  }}>
                  <Text style={s.btnTxt}>গ্রহণ করুন</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.sBtn, { backgroundColor: '#dc2626' }]} onPress={() => setHasReq(false)}>
                  <Text style={s.btnTxt}>বাতিল</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={[s.info, { color: '#16a34a', fontWeight: 'bold' }]}>✅ রাইড গ্রহণ করা হয়েছে</Text>
                <View style={[s.row, { marginTop: 10 }]}>
                  <TouchableOpacity style={[s.sBtn, { backgroundColor: '#2563eb' }]} onPress={() => setScreen('R_CHAT')}>
                    <Text style={s.btnTxt}>💬 চ্যাট</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.sBtn, { backgroundColor: '#0f172a' }]}
                    onPress={() => {
                      setRBal(Math.max(0, rBal - fee));
                      setAdminBal(adminBal + fee);
                      setAccepted(false);
                      setHasReq(false);
                      Alert.alert('ট্রিপ শেষ', `${toBn(fee)}৳ ফি কাটা হয়েছে।`);
                    }}>
                    <Text style={s.btnTxt}>ট্রিপ শেষ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {online && !hasReq && (
          <View style={s.card}>
            <Text style={s.info}>এখন কোনো রিকোয়েস্ট নেই...</Text>
          </View>
        )}

        <View style={s.card}>
          <Text style={s.lbl}>ব্যালেন্স রিচার্জ:</Text>
          <Text style={s.info}>bKash: 01700-111111</Text>
          <Text style={s.info}>Nagad: 01800-222222</Text>
        </View>
      </ScrollView>
    );
  }

  if (screen === 'R_CHAT') {
    return (
      <SafeAreaView style={s.page}>
        <View style={s.row}>
          <Text style={s.h1}>কাস্টমারের সাথে চ্যাট 💬</Text>
        </View>
        <ScrollView style={s.chatBox}>
          {chats.map((c) => (
            <View key={c.id} style={[s.bubble, c.by === 'RIDER' ? s.bRight : s.bLeft]}>
              <Text style={{ color: c.by === 'RIDER' ? '#fff' : '#0f172a' }}>{c.txt}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={s.row}>
          <TextInput
            style={[s.input, { flex: 1, marginRight: 8, marginBottom: 0 }]}
            value={chatMsg}
            onChangeText={setChatMsg}
            placeholder="মেসেজ লিখুন..."
          />
          <TouchableOpacity style={s.send} onPress={() => sendChat('RIDER')}>
            <Text style={s.btnTxt}>পাঠান</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setScreen('R_HOME')}>
          <Text style={s.back}>← ফিরে যান</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return null;
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f1f5f9' },
  page: { flex: 1, padding: 16, paddingTop: 50, backgroundColor: '#f1f5f9' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#0f172a', marginBottom: 6 },
  sub: { textAlign: 'center', color: '#64748b', marginBottom: 20, fontSize: 12 },
  h1: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 10 },
  h2: { fontSize: 17, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  lbl: { fontSize: 14, fontWeight: '600', color: '#334155', marginTop: 8, marginBottom: 4 },
  info: { fontSize: 14, color: '#334155', marginVertical: 2 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  btn: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 6,
  },
  btnTxt: { color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
  sBtn: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  chip: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  chipOn: { backgroundColor: '#16a34a' },
  chipTxt: { color: '#0f172a', fontSize: 13 },
  vCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 4,
  },
  vCardOn: { borderColor: '#16a34a', backgroundColor: '#f0fdf4' },
  seat: { fontSize: 11, color: '#475569' },
  vTitle: { fontSize: 15, fontWeight: 'bold', marginTop: 6, color: '#0f172a' },
  warn: { backgroundColor: '#fee2e2', padding: 10, borderRadius: 8, marginVertical: 8 },
  chatBox: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 10 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 10, marginBottom: 8 },
  bRight: { alignSelf: 'flex-end', backgroundColor: '#16a34a' },
  bLeft: { alignSelf: 'flex-start', backgroundColor: '#e2e8f0' },
  send: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8 },
  badge: { backgroundColor: '#0f172a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  back: { textAlign: 'center', color: '#2563eb', fontWeight: 'bold', marginVertical: 14 },
});

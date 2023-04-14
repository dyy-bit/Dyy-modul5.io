//kode3.10.cpp
#include <iostream>
#include <string>
#include <cstring>

int main ()
{
using namespace std;


char charr[20];
string str;
cout << " Panjang string di dalam array charr sebelum masukan: " << strlen(charr) << endl;
cout << " Panjang string di dalam string str sebelum masukan: " << str.size() << endl;
cout << " Masukkan sebaris teks:\n ";
cin.getline(charr, 20);
cout << " Anda memasukkan: " << charr << endl;


cout << " Masukkan sebaris teks lain:\n ";
getline(cin, str);
cout << " Anda memasukkan: " << str << endl;
cout << " Panjang string di dalam array charr setelah masukan input: "
<< strlen(charr) << endl;
cout << " Panjang string di dalam string str setelah masukan: "
<< str.size() << endl;

return 0;




}

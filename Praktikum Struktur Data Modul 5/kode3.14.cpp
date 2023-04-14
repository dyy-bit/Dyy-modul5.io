//kode3.14.cpp
#include<iostream>
#include<conio.h>   // untuk getche()
enum apaKATA {TIDAK, YA};   // TIDAK= 0, YA=1

int main ()
{
using namespace std;

apaKATA KATA = TIDAK;
char ch = 'a';
int jlh_kata = 0;

cout << " Masukkan suatu frase:\n ";
do {
ch = getche();
if(ch=='a'||ch=='\r')
{
if(KATA == TIDAK)
{
jlh_kata++;
KATA = TIDAK;
}
}
else
if( KATA == TIDAK )
KATA = YA;
}while( ch!= '\r');
cout << "\n---Jumlah kata adalah" << jlh_kata << "---\n";
return 0;
}

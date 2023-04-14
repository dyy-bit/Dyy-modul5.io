//kode3.9.cpp
#include <iostream>
#include <string>
#include <cstring>

int main ()

{
using namespace std;
char charr1[20];
char charr2[20] = "Harimau";
string str1;
string str2 = "Singa";

// Menugaskan objek string dan array karakter
str1 = str2;
strcpy (charr1, charr2);

// Menambahkan objek string dan array karakter
str1 += " Kalimantan ";
strcat (charr1, " Sumatera ");

// Mencari panjang suatu objek string dan string versi C
int len1 = str1.size();
int len2 = strlen (charr1);
cout << " String " << str1 << " memuat "
<< len1 << " karakter.\n ";
cout << " String " << charr1 << " memuat "
<< len2 << " karakter.\n ";

return 0;


}

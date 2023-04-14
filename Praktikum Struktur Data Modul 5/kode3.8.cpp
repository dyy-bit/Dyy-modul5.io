//kode3.8.cpp
#include <iostream>
#include <string>

int main ()

{
using namespace std;
string s1 = " Harimau Sumatera ";
string s2, s3;
cout << " Anda dapat menugaskan suatu objek string kepada objek string lain: s2 = s1\n ";
s2 = s1;
cout << " s1: " << s1 << ", s2: " << s2 << endl;
cout << " Anda dapat menugaskan string versi C ke suatu objek string.\n ";
cout << " s2 = \"ORANG UTAN\"\n";
s2 = " ORANG UTAN ";
cout << " s2: " << s2 << endl;
cout << " Anda dapat menggabungkan 2 string: s3 = s1 = s2\n ";
s3 = s1 + s2;
cout << " s3: " << s3 << endl;
cout << " Anda dapat menempatkan suatu string ke buntut string lainnya.\n ";
s1 += s2;
cout << " s1 += s2 menghasilkan s1 = " << s1 << endl;
s2 += " dari Indonesia ";
cout << "s2 += \"dari Indonesia\"menghasilkan s2 = " << s2 << endl;

return 0;




}

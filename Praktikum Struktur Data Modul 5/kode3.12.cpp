//kode3.12.cpp
#include <iostream>
struct pemain
{
char nama[20];
float tinggi_badan;
double rata2_gol;
};

int main ()
{
using namespace std;

pemain timnas =
{
"Irfan Bachdim",
1.80,
2.49
};
pemain pssi;
cout << " Timnas: \n " << timnas.nama << " , Tinggi badan : "
<< timnas.tinggi_badan << " , Rata-Rata gol Gol : " << timnas.rata2_gol << endl;

pssi = timnas;
cout << " PSSI: \n " << pssi.nama << " , Tinggi badan : "
<< pssi.tinggi_badan << " , Rata-Rata Gol : " << pssi.rata2_gol << endl;

return 0;

}

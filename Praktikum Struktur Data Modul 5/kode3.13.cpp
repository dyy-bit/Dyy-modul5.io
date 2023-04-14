//kode3.13.cpp
#include <iostream>
struct pemain
{
char nama[20];
float tinggi_badan;
double rata2_gol;
};

int main()
{
using namespace std;

pemain pssi[2] =
{
{"Christian Gonzales", 1.88, 2.99},
{"Firman Utina", 1.77, 1.99}
};

cout << "Nama: \n" << pssi[0].nama << ", Tinggi badan : "
<< pssi[0].tinggi_badan << ", Rata-Rata Gol : " << pssi[0].rata2_gol << endl;

cout << "dan \n"
<< pssi[1].nama << ", Tinggi badan : "
<< pssi[1].tinggi_badan << ", Rata-Rata Gol : " << pssi[1].rata2_gol << endl;

cout << "\"Indonesia bangga memiliki mereka\"\n";

return 0;



}

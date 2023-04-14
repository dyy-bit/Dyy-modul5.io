//kode3.11.cpp
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


pemain pssi =
{
"Christian Gonzales",
1.88,
2.99
}; //pssi adalah variable struktur bertipe pemain
//diinisialisasi dengan nilai-nilai di atas
pemain garuda =
{
" Firman Utina ",
1.77,
1.99
}; //pssi adalah variabel struktur bertipe pemain
cout << " Pemain Timnas Garuda:\n " << pssi.nama << ", Tinggi Badan : "
<< pssi.tinggi_badan << ", Rata-Rata Gol : " << pssi.rata2_gol << endl;

cout << " dan \n " << garuda.nama << " , Tinggi Badan : "
<< garuda.tinggi_badan << ", Rata-Rata Gol : " << garuda.rata2_gol << endl;
//garuda.nama adalah anggota nama dari variabel garuda
cout << "\" Indonesia bangga memiliki mereka\"\n";

return 0;

}

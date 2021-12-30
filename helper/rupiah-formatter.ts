export const rupiahFormatter = (angka:number, prefix:string) : string=>{
    var number_string = angka.toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substring(0, sisa),
    ribuan     		= split[0].substring(sisa).match(/\d{3}/gi);

    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

    return prefix == undefined ? rupiah : (rupiah ? 'Rp.' + rupiah : '');
}
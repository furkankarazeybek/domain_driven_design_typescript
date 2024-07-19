
export class userDto {



// Kullanıcı DTO'lerinin bir listesini alır ve productIds'leri döndürür
 userProductIdsDto(users: any ){
    // Her kullanıcının productIds'lerini içeren bir liste oluştur
    const userProductIdList: string[] = users.flatMap((user : any) => user.productIds);

    return userProductIdList;
}

}









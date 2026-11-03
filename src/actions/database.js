'use server'
import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
)
class FamilyMember {
    constructor(name,fatherName,motherName,spouseName){
    this.id=crypto.randomUUID();
    this.name = name;
    this.fatherName = fatherName;
    this.motherName = motherName;
    this.spouseName = spouseName;
    this.fatherId = null;
    this.motherId = null;
    this.spouseId = null;
    }

}

const familyMembers = [
new FamilyMember("Titus, Njoki & Macharia Family",null,null,null),
new FamilyMember("Titus Macharia Wanyiri","Titus, Njoki & Macharia Family",null,"Joyce Nyambura"),
new FamilyMember("Esther Njoki","Titus, Njoki & Macharia Family",null,null),
new FamilyMember("John Kamau",null,"Esther Njoki",null),
new FamilyMember("Jane Wanjiru",null,"Esther Njoki","Riungu"),
new FamilyMember("Maina",null,"Esther Njoki","Margaret"),
new FamilyMember("Joseph Kanyuga","John Kamau",null,null),
new FamilyMember("Mark Ngugi","John Kamau",null,null),
new FamilyMember("Ngina","John Kamau",null,null),
new FamilyMember("Erick","Riungu","Jane Wanjiru",null),
new FamilyMember("Kanyuga","Maina","Margaret",null),
new FamilyMember("Thamaini","Maina","Margaret",null),
new FamilyMember("Mwangi Wanjeri",null,"Mercy Wanjeri",null),
new FamilyMember("Kirima",null,"Mercy Wanjeri",null),
new FamilyMember("Kanyi",null,"Mercy Wanjeri","Nduta"),
new FamilyMember("Wangechi",null,"Mercy Wanjeri","Gachie"),
new FamilyMember("Agnes Wanjiru","Kirima",null,null),
new FamilyMember("Kariuki",null,"Agnes Wanjiru",null),
new FamilyMember("Mercy Wanjeri","Titus, Njoki & Macharia Family",null,null),
new FamilyMember("Nelson Mwangi Macharia","Titus Macharia Wanyiri","Joyce Nyambura","Eunice Wambui"),
new FamilyMember("Rachel Wangeci","Titus Macharia Wanyiri","Joyce Nyambura","John Kamithi"),
new FamilyMember("John Kirima Macharia","Titus Macharia Wanyiri","Joyce Nyambura","Peninah Wanjiru"),
new FamilyMember("Josphat Gathogo Macharia","Titus Macharia Wanyiri","Joyce Nyambura","Rebecca Wangechi"),
new FamilyMember("Josphine Wanjiku","Titus Macharia Wanyiri","Joyce Nyambura","Julius Kimani"),
new FamilyMember("Jane Nyambura","Nelson Mwangi Macharia","Eunice Wambui","Njihia"),
new FamilyMember("Duncan Kamau","Nelson Mwangi Macharia","Eunice Wambui",null),
new FamilyMember("John Kirima Mwangi","Nelson Mwangi Macharia","Eunice Wambui",null),
new FamilyMember("Simon Maina Mwangi","Nelson Mwangi Macharia","Eunice Wambui",null),
new FamilyMember("Muthoni Mary","Nelson Mwangi Macharia","Eunice Wambui","Mburu"),
new FamilyMember("Susan Wanjiru Mwangi","Nelson Mwangi Macharia","Eunice Wambui","Kihunyu"),
new FamilyMember("Agnes Njeri","Nelson Mwangi Macharia","Eunice Wambui",null),
new FamilyMember("Josphat Gathogo Mwangi","Nelson Mwangi Macharia","Eunice Wambui","Lilian Njoki"),
new FamilyMember("Jennefer Nyambura","John Kirima Macharia","Peninah Wanjiru","Mbugua"),
new FamilyMember("Alice Njeri","John Kirima Macharia","Peninah Wanjiru","Ngugi"),
new FamilyMember("Titus Macharia Kirima","John Kirima Macharia","Peninah Wanjiru","Jane Mugechi"),
new FamilyMember("Robinson Gatonye","John Kirima Macharia","Peninah Wanjiru",null),
new FamilyMember("Nelson Mwangi Kirima","John Kirima Macharia","Peninah Wanjiru",null),
new FamilyMember("Ben Magira","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Elizabeth Wanjiku","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Macharia Kamithi","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Githinji","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Mwangi","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Maina","John Kamithi","Rachel Wangeci",null),
new FamilyMember("Irene Nyambura","Josphat Gathogo Macharia","Rebecca Wangechi","Macharia"),
new FamilyMember("Cathrine Muthoni","Josphat Gathogo Macharia","Rebecca Wangechi","Nganga"),
new FamilyMember("Susan Wanjiru","Josphat Gathogo Macharia","Rebecca Wangechi","Gichuki"),
new FamilyMember("Gladys Waiyego","Josphat Gathogo Macharia","Rebecca Wangechi","Guandaru"),
new FamilyMember("Titus Macharia Gathogo","Josphat Gathogo Macharia","Rebecca Wangechi","Mary Njeri"),
new FamilyMember("Rachel Waithera","Josphat Gathogo Macharia","Rebecca Wangechi","Mishek Weru"),
new FamilyMember("Nelson Mwangi Gathogo","Josphat Gathogo Macharia","Rebecca Wangechi","Hannah Muthoni"),
new FamilyMember("John Kirima Gathogo","Josphat Gathogo Macharia","Rebecca Wangechi","Elizabeth Wanjiru"),
new FamilyMember("Duncan Kamau","Josphat Gathogo Macharia","Rebecca Wangechi",null),
new FamilyMember("Grace Wanjiku","Josphat Gathogo Macharia","Rebecca Wangechi","Kamau"),
new FamilyMember("Josphine Njoki","Josphat Gathogo Macharia","Rebecca Wangechi","Ndirangu"),
new FamilyMember("Obadiah Kariuki","Josphat Gathogo Macharia","Rebecca Wangechi","Anne Njeri"),
new FamilyMember("Joyce Nyambura Kimani","Julius Kimani","Josphine Wanjiku","Mugo"),
new FamilyMember("Dickson Mwangi","Julius Kimani","Josphine Wanjiku",null),
new FamilyMember("Wangu","Julius Kimani","Josphine Wanjiku",null),
new FamilyMember("Titus Macharia Kimani","Julius Kimani","Josphine Wanjiku",null),
new FamilyMember("Irene Wanjiru","Julius Kimani","Josphine Wanjiku",null),
new FamilyMember("Eunice Wambui",null,null,"Nelson Mwangi Macharia"),
new FamilyMember("Peninah Wanjiru",null,null,"John Kirima Macharia"),
new FamilyMember("Rebecca Wangechi",null,null,"Josphat Gathogo Macharia"),
new FamilyMember("Julius Kimani",null,null,"Josphine Wanjiku"),
new FamilyMember("Joyce Nyambura",null,null,"Titus Macharia Wanyiri"),
new FamilyMember("John Kamithi",null,null,"Rachel Wangeci"),
new FamilyMember("Njihia",null,null,"Jane Nyambura"),
new FamilyMember("Mburu",null,null,"Muthoni Mary"),
new FamilyMember("Kihunyu",null,null,"Susan Wanjiru"),
new FamilyMember("Lilian Njoki",null,null,"Josphat Gathogo Mwangi"),
new FamilyMember("Mbugua",null,null,"Jennefer Nyambura"),
new FamilyMember("Ngugi",null,null,"Alice Njeri"),
new FamilyMember("Jane Mugechi",null,null,"Titus Macharia Kirima"),
new FamilyMember("Macharia",null,null,"Irene Nyambura"),
new FamilyMember("Nganga",null,null,"Cathrine Muthoni"),
new FamilyMember("Gichuki",null,null,"Susan Wanjiru"),
new FamilyMember("Guandaru",null,null,"Gladys Waiyego"),
new FamilyMember("Mary Njeri",null,null,"Titus Macharia Gathogo"),
new FamilyMember("Mishek Weru",null,null,"Rachel Waithera"),
new FamilyMember("Hannah Muthoni",null,null,"Nelson Mwangi Gathogo"),
new FamilyMember("Elizabeth Wanjiru",null,null,"John Kirima Gathogo"),
new FamilyMember("Kamau",null,null,"Grace Wanjiku"),
new FamilyMember("Ndirangu",null,null,"Josphine Njoki"),
new FamilyMember("Anne Njeri",null,null,"Obadiah Kariuki"),
new FamilyMember("Mugo",null,null,"Joyce Nyambura Kimani"),
new FamilyMember("Riungu",null,null,"Jane Wanjiru"),
new FamilyMember("Margaret",null,null,"Maina"),
new FamilyMember("Nduta",null,null,"Kanyi"),
new FamilyMember("Gachie",null,null,"Wangechi"),
];
let patnerIdArrays=[];
export async function SeedDatabase(){
    familyMembers.forEach(async (member)=>{
    if(member.fatherName){
        const fatherObject=familyMembers.find((p)=>p.name===member.fatherName);
        
        if(fatherObject){
            member.fatherId=fatherObject.id;
        }
        else{
            console.error(`Father with name ${member.fatherName} not found for member ${member.name}`);
        }
    }
    if(member.motherName){
        const motherObject=familyMembers.find((p)=>p.name===member.motherName);
        if(motherObject){
            member.motherId=motherObject.id;
        }
        else{
            console.error(`Mother with name ${member.motherName} not found for member ${member.name}`);
        }
    }

    try{
        if (member.spouseName && member.spouseId === null) {
            const spouseObject=familyMembers.find((p)=>p.name===member.spouseName);
            if(spouseObject){
                member.spouseId=spouseObject.id;
                familyMembers.forEach((p)=>{
                    if(p.name===member.spouseName){
                        p.spouseId=member.id;
                    }
                });
            }
            else{
                console.error(`Spouse with name ${member.spouseName} not found for member ${member.name}`);
            }
        console.log("Partner IDs:", {partner_1_id: member.id, partner_2_id: member.spouseId});
        patnerIdArrays.push({partner_1_id: member.id, partner_2_id: member.spouseId});
        
        }

    }
    catch(error){
        console.error("Error :", error);
    }
    });
    const familyToDatabase=familyMembers.map((member)=>{
        return {
            id: member.id,
            name: member.name,
            father_id: member.fatherId,
            mother_id: member.motherId,
        }
    })
    console.log("Family to Database:", familyToDatabase);
//Insert data into the people table
try{
    const {error}=await supabase.from('people').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const {data,error: insertError}=await supabase.from('people').insert(familyToDatabase);
    if(error){
        console.error("Error inserting data into people table:", error);
    }
    else{
        console.log("Data inserted into people table:", data);
    }
}
catch(error){
    console.error("Error:", error);
}

//Insert data into unions table
try{
    const {error: deleteError}=await supabase.from('unions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    const {data,error}=await supabase.from('unions').insert(patnerIdArrays);
    if(error){
        console.error("Error inserting data into unions table:", error);
    }
    else{
        console.log("Data inserted into unions table:", data);
    }
}
catch(error){
    console.error("Error:", error);
}
    
    }
export default async function fetchFamilyMembers(){
try{
const {data,error}=await supabase.from('people').select('*');
if(error){
    console.error("Error fetching data from people table:", error);
    return [];
}
else{

    return data;
}
}
catch(error){
console.error("Error:", error);
}

}
export async function fetchUnions(){
    try{
        const {data,error}=await supabase.from('unions').select('*');
        if(error){
            console.error("Error fetching data from unions table:", error);
            return [];
        }
        else{

            return data;
        }
    }
    catch(error){
        console.error("Error:", error);
    }
}
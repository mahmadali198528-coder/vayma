import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
async function main(){await prisma.program.upsert({where:{title:"[DEMO] Коран"},update:{},create:{title:"[DEMO] Коран",description:"Демонстрационная запись — заменить подтверждёнными данными.",published:false}});await prisma.news.upsert({where:{slug:"demo-news"},update:{},create:{title:"[DEMO] Заголовок новости",slug:"demo-news",excerpt:"Демонстрационный контент.",content:"[ДОБАВИТЬ ИНФОРМАЦИЮ]",category:"Новости",status:"DRAFT"}})}main().finally(()=>prisma.$disconnect());

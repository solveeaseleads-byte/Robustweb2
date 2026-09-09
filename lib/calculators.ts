export type Field={key:string;label:string;placeholder:number;hint:string;min?:number};
export function fieldConfig(slug:string):Field[]{
 const map:Record<string,Field[]>={
 'profit-calculator':[{key:'revenue',label:'Revenue',placeholder:1000,hint:'Total sales'},{key:'costs',label:'Total costs',placeholder:700,hint:'All costs'}],
 'roi-calculator':[{key:'gain',label:'Gain / return',placeholder:1500,hint:'Value received'},{key:'investment',label:'Investment',placeholder:1000,hint:'Amount invested'}],
 'markup-calculator':[{key:'cost',label:'Cost',placeholder:100,hint:'Unit cost'},{key:'markup',label:'Markup %',placeholder:30,hint:'Target markup'}],
 'margin-calculator':[{key:'price',label:'Selling price',placeholder:130,hint:'Revenue per unit'},{key:'cost',label:'Cost',placeholder:100,hint:'Cost per unit'}],
 'break-even-calculator':[{key:'fixed',label:'Fixed costs',placeholder:1000,hint:'Monthly fixed costs'},{key:'price',label:'Price per sale',placeholder:100,hint:'Selling price'},{key:'variable',label:'Variable cost / sale',placeholder:60,hint:'Variable cost'}],
 'pricing-calculator':[{key:'cost',label:'Unit cost',placeholder:100,hint:'Total cost per unit'},{key:'margin',label:'Target margin %',placeholder:30,hint:'Desired margin'}],
 'roas-calculator':[{key:'revenue',label:'Ad-attributed revenue',placeholder:3000,hint:'Revenue from ads'},{key:'spend',label:'Ad spend',placeholder:1000,hint:'Advertising spend'}],
 'cac-calculator':[{key:'spend',label:'Marketing spend',placeholder:1000,hint:'Campaign spend'},{key:'customers',label:'New customers',placeholder:20,hint:'Customers acquired'}],
 'hourly-rate-calculator':[{key:'income',label:'Target annual income',placeholder:50000,hint:'Before tax'},{key:'hours',label:'Billable hours / year',placeholder:1000,hint:'Realistic billable hours'}],
 'amazon-profit-checker':[{key:'price',label:'Sale price',placeholder:40,hint:'Per unit'},{key:'cost',label:'Product + shipping cost',placeholder:15,hint:'Per unit'},{key:'fees',label:'Marketplace + ad fees',placeholder:10,hint:'Per unit'}],
 'cleaning-profit-calculator':[{key:'price',label:'Job price',placeholder:180,hint:'Customer charge'},{key:'labor',label:'Labor cost',placeholder:70,hint:'Cleaner labor'},{key:'supplies',label:'Supplies',placeholder:15,hint:'Consumables'},{key:'travel',label:'Travel cost',placeholder:10,hint:'Travel / vehicle'}],
 'cleaning-quote-calculator':[{key:'hours',label:'Estimated hours',placeholder:3,hint:'Job time'},{key:'rate',label:'Target labor rate',placeholder:35,hint:'Cost/rate per hour'},{key:'margin',label:'Target margin %',placeholder:25,hint:'Target margin'}],
 'cleaning-time-estimator':[{key:'area',label:'Area (sq ft)',placeholder:1200,hint:'Approximate area'},{key:'speed',label:'Sq ft per hour',placeholder:400,hint:'Adjust to your service'}],
 'cloud-cost-calculator':[{key:'compute',label:'Compute / month',placeholder:100,hint:'Estimate'},{key:'storage',label:'Storage / month',placeholder:30,hint:'Estimate'},{key:'network',label:'Network / month',placeholder:20,hint:'Estimate'}],
 'business-health-check':[{key:'revenue',label:'Monthly revenue',placeholder:5000,hint:'Sales'},{key:'costs',label:'Monthly costs',placeholder:4000,hint:'All costs'},{key:'cash',label:'Cash available',placeholder:2000,hint:'Available cash'}],
 };
 return map[slug]||[{key:'a',label:'Value A',placeholder:100,hint:'Enter a value'},{key:'b',label:'Value B',placeholder:50,hint:'Enter a value'}];
}
export function calculate(slug:string,v:Record<string,number>):number{
 switch(slug){
 case 'profit-calculator':return v.revenue-v.costs;
 case 'roi-calculator':return v.investment?((v.gain-v.investment)/v.investment)*100:0;
 case 'markup-calculator':return v.cost*(1+v.markup/100);
 case 'margin-calculator':return v.price?((v.price-v.cost)/v.price)*100:0;
 case 'break-even-calculator':return v.price>v.variable?(v.fixed/(v.price-v.variable)):Infinity;
 case 'pricing-calculator':return v.margin<100?v.cost/(1-v.margin/100):Infinity;
 case 'roas-calculator':return v.spend?v.revenue/v.spend:0;
 case 'cac-calculator':return v.customers?v.spend/v.customers:Infinity;
 case 'hourly-rate-calculator':return v.hours?v.income/v.hours:Infinity;
 case 'amazon-profit-checker':return v.price-v.cost-v.fees;
 case 'cleaning-profit-calculator':return v.price-v.labor-v.supplies-v.travel;
 case 'cleaning-quote-calculator':return v.margin<100?(v.hours*v.rate)/(1-v.margin/100):Infinity;
 case 'cleaning-time-estimator':return v.speed?v.area/v.speed:Infinity;
 case 'cloud-cost-calculator':return v.compute+v.storage+v.network;
 case 'business-health-check':return v.revenue?v.revenue-v.costs:0;
 default:return v.a-v.b;
 }
}
export function formatResult(x:number){if(!Number.isFinite(x))return 'Check your inputs';return Math.abs(x)>=1000?x.toLocaleString(undefined,{maximumFractionDigits:2}):x.toLocaleString(undefined,{maximumFractionDigits:2});}

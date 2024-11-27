export const 
config = {
  columns: [
   {title:'id', content: ({id}) => id},
   {title:'name', content: ({name})=> name},
   {title:'email', content: ({ email})=> <Email email={email}/>},
   {title:'address', content: (({ address })=> <MapLink geo={address.geo} text={`${address.city} ${address.street}`}/>)},
  ]
};

function MapLink({geo, text}) {
    return <a href={`https://maps.google.com/?lat=${geo.lat}&lng=${geo.lng}`}>{text}</a>
 }
   function Email({email}) {
    return <a href={'mailto:' + email}>{email}</a>
   }
import Link from "next/link";
import classes from "@/components/pages/Header.module.css";

const 
   pages = [
    {href:'/', title: 'home'},
    {href:'/ToDo', title:'ToDo-list'},
   ];

export function Header(){
    return <header>
<nav className={classes.navigation}>
    <ul>
    {pages.map(({href,title})=> <li key={href}>
        <Link href={href}>{title}</Link>
    </li>)}
    </ul>
</nav>
    </header>
}
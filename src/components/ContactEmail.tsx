import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/cv';
export const ContactEmail = () => <a className="pill" href={'mailto:'+profile.email}>Escríbeme <ArrowUpRight size={18}/></a>;

PGDMP                     	    y            mywallet    14.0    14.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16556    mywallet    DATABASE     ]   CREATE DATABASE mywallet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE mywallet;
                postgres    false            ?            1259    16573    sessions    TABLE     `   CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text
);
    DROP TABLE public.sessions;
       public         heap 
   pedrolpin4    false            ?            1259    16572    sessions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public       
   pedrolpin4    false    212                       0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public       
   pedrolpin4    false    211            ?            1259    16630    transactions    TABLE     ?   CREATE TABLE public.transactions (
    id integer NOT NULL,
    "userId" integer,
    value numeric,
    description text,
    date date
);
     DROP TABLE public.transactions;
       public         heap 
   pedrolpin4    false            ?            1259    16629    transactions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public       
   pedrolpin4    false    214                       0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public       
   pedrolpin4    false    213            ?            1259    16559    users    TABLE     i   CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);
    DROP TABLE public.users;
       public         heap 
   pedrolpin4    false            ?            1259    16558    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       
   pedrolpin4    false    210                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public       
   pedrolpin4    false    209            r           2604    16576    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public       
   pedrolpin4    false    211    212    212            s           2604    16633    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public       
   pedrolpin4    false    213    214    214            q           2604    16562    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       
   pedrolpin4    false    209    210    210                      0    16573    sessions 
   TABLE DATA           7   COPY public.sessions (id, "userId", token) FROM stdin;
    public       
   pedrolpin4    false    212   y                 0    16630    transactions 
   TABLE DATA           N   COPY public.transactions (id, "userId", value, description, date) FROM stdin;
    public       
   pedrolpin4    false    214   ?                  0    16559    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public       
   pedrolpin4    false    210   _                  0    0    sessions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.sessions_id_seq', 261, true);
          public       
   pedrolpin4    false    211                       0    0    transactions_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seq', 144, true);
          public       
   pedrolpin4    false    213                       0    0    users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.users_id_seq', 393, true);
          public       
   pedrolpin4    false    209               Q   x???? ???B8E?%4?	?5??????3XB?;&?Ҝ??T?v?E???z?????Թ??qX#??X??
????C         u  x?}?MR?0???9?@?????n4c?!L?????(??Rv2.hK?b?|??????Y?TaXkG˔P2?"W:SG?dv??jy??????M???o?6>????흷??D?E<?d??l??g~
v"5?f5???̶%?<??+b?X???7T!J?eXBb??h؋?z?_w???N?w??`??;??J????ʔY??y9p?a!???(??)?{????&??B?F?ˈ?YlO?1*9?`??L??XG?Ԏ?i??????I{7=???]8?>H?&NDB2??~u??FZ??7? ??1&??SK4?F?U"?<??~?:n?OUUGf?m @&?????;*q??(?G?"?w??)y,?,?"??J            x?e?ɒ?0 ?3|?? 	??T\Evԩ? ??$,??;k??x????F?Ƒ????yiӘ???!?p\\@Zcn ??8@??$B#qH?]J?[L ?rz??,??3??$L?\?J?y??k??/??~*>xi??	$???K?5?0?f?x?l?u???:Mm??YjJE???x\???&??x??????y??.Z?{???"?e?ay??? {Ob"Q?/?%??K8??K߃?.???<ۅ????nlI@?R,?Y?fd5??LL?E,W?>R-aLm?D.?_????w?     
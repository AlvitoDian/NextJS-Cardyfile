PGDMP  	    $                }         	   cardyfile    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16620 	   cardyfile    DATABASE     o   CREATE DATABASE cardyfile WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
    DROP DATABASE cardyfile;
                     postgres    false            �            1259    16621    m_card    TABLE     �   CREATE TABLE public.m_card (
    card_link text NOT NULL,
    title character varying(100),
    crtby character varying(100),
    chgby character varying(100),
    crtdt timestamp without time zone,
    chgdt timestamp without time zone
);
    DROP TABLE public.m_card;
       public         heap r       postgres    false            �            1259    16626    m_card_content    TABLE       CREATE TABLE public.m_card_content (
    card_link text NOT NULL,
    usrnm character varying(100),
    desc1 character varying(100),
    primg text,
    bnimg text,
    bgclr character varying(10),
    crtdt timestamp(0) without time zone,
    chgdt timestamp(0) without time zone
);
 "   DROP TABLE public.m_card_content;
       public         heap r       postgres    false            �            1259    16631    m_card_menu    TABLE     z   CREATE TABLE public.m_card_menu (
    card_link text NOT NULL,
    seq bigint NOT NULL,
    desc1 text,
    href1 text
);
    DROP TABLE public.m_card_menu;
       public         heap r       postgres    false            �            1259    16636    m_card_menu_seq_seq    SEQUENCE     |   CREATE SEQUENCE public.m_card_menu_seq_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.m_card_menu_seq_seq;
       public               postgres    false    219            �           0    0    m_card_menu_seq_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.m_card_menu_seq_seq OWNED BY public.m_card_menu.seq;
          public               postgres    false    220            �            1259    16637    m_card_socmed    TABLE     |   CREATE TABLE public.m_card_socmed (
    card_link text NOT NULL,
    seq bigint NOT NULL,
    desc1 text,
    href1 text
);
 !   DROP TABLE public.m_card_socmed;
       public         heap r       postgres    false            �            1259    16642    m_card_socmed_seq_seq    SEQUENCE     ~   CREATE SEQUENCE public.m_card_socmed_seq_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.m_card_socmed_seq_seq;
       public               postgres    false    221            �           0    0    m_card_socmed_seq_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.m_card_socmed_seq_seq OWNED BY public.m_card_socmed.seq;
          public               postgres    false    222            �            1259    16643    m_user    TABLE     �   CREATE TABLE public.m_user (
    usrid bigint NOT NULL,
    email character varying(100),
    usrpw character varying(100),
    crtdt timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    crtby character varying(40),
    primg text
);
    DROP TABLE public.m_user;
       public         heap r       postgres    false            �            1259    16649    m_user_usrid_seq    SEQUENCE     y   CREATE SEQUENCE public.m_user_usrid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.m_user_usrid_seq;
       public               postgres    false    223            �           0    0    m_user_usrid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.m_user_usrid_seq OWNED BY public.m_user.usrid;
          public               postgres    false    224            3           2604    16650    m_card_menu seq    DEFAULT     r   ALTER TABLE ONLY public.m_card_menu ALTER COLUMN seq SET DEFAULT nextval('public.m_card_menu_seq_seq'::regclass);
 >   ALTER TABLE public.m_card_menu ALTER COLUMN seq DROP DEFAULT;
       public               postgres    false    220    219            4           2604    16651    m_card_socmed seq    DEFAULT     v   ALTER TABLE ONLY public.m_card_socmed ALTER COLUMN seq SET DEFAULT nextval('public.m_card_socmed_seq_seq'::regclass);
 @   ALTER TABLE public.m_card_socmed ALTER COLUMN seq DROP DEFAULT;
       public               postgres    false    222    221            5           2604    16652    m_user usrid    DEFAULT     l   ALTER TABLE ONLY public.m_user ALTER COLUMN usrid SET DEFAULT nextval('public.m_user_usrid_seq'::regclass);
 ;   ALTER TABLE public.m_user ALTER COLUMN usrid DROP DEFAULT;
       public               postgres    false    224    223            �          0    16621    m_card 
   TABLE DATA           N   COPY public.m_card (card_link, title, crtby, chgby, crtdt, chgdt) FROM stdin;
    public               postgres    false    217   k"       �          0    16626    m_card_content 
   TABLE DATA           d   COPY public.m_card_content (card_link, usrnm, desc1, primg, bnimg, bgclr, crtdt, chgdt) FROM stdin;
    public               postgres    false    218   �"       �          0    16631    m_card_menu 
   TABLE DATA           C   COPY public.m_card_menu (card_link, seq, desc1, href1) FROM stdin;
    public               postgres    false    219   '#       �          0    16637    m_card_socmed 
   TABLE DATA           E   COPY public.m_card_socmed (card_link, seq, desc1, href1) FROM stdin;
    public               postgres    false    221   D#       �          0    16643    m_user 
   TABLE DATA           J   COPY public.m_user (usrid, email, usrpw, crtdt, crtby, primg) FROM stdin;
    public               postgres    false    223   a#       �           0    0    m_card_menu_seq_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.m_card_menu_seq_seq', 1, false);
          public               postgres    false    220            �           0    0    m_card_socmed_seq_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.m_card_socmed_seq_seq', 1, false);
          public               postgres    false    222            �           0    0    m_user_usrid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.m_user_usrid_seq', 8, true);
          public               postgres    false    224            <           2606    16654    m_card_menu m_card_menu_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.m_card_menu
    ADD CONSTRAINT m_card_menu_pkey PRIMARY KEY (card_link, seq);
 F   ALTER TABLE ONLY public.m_card_menu DROP CONSTRAINT m_card_menu_pkey;
       public                 postgres    false    219    219            8           2606    16656    m_card m_card_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.m_card
    ADD CONSTRAINT m_card_pkey PRIMARY KEY (card_link);
 <   ALTER TABLE ONLY public.m_card DROP CONSTRAINT m_card_pkey;
       public                 postgres    false    217            >           2606    16658     m_card_socmed m_card_socmed_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.m_card_socmed
    ADD CONSTRAINT m_card_socmed_pkey PRIMARY KEY (card_link, seq);
 J   ALTER TABLE ONLY public.m_card_socmed DROP CONSTRAINT m_card_socmed_pkey;
       public                 postgres    false    221    221            :           2606    16660    m_card_content m_user_card_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.m_card_content
    ADD CONSTRAINT m_user_card_pkey PRIMARY KEY (card_link);
 I   ALTER TABLE ONLY public.m_card_content DROP CONSTRAINT m_user_card_pkey;
       public                 postgres    false    218            @           2606    16662    m_user m_user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.m_user
    ADD CONSTRAINT m_user_pkey PRIMARY KEY (usrid);
 <   ALTER TABLE ONLY public.m_user DROP CONSTRAINT m_user_pkey;
       public                 postgres    false    223            �   p   x�e�;� Dk80b �!|7+ŕe��}�*R�7�̛v�js���]N{���� ʒx�5 ���5Ka��t��m�T:)M��ˍ��
J�@1����{��=$-      �   ,   x�I-.1��CAFF��&���
��V&&V&F@a�=... %
t      �      x������ � �      �      x������ � �      �   �  x�m�˒�@ ��5>En�m�hXEDPQ�ـܼ�\d�>fJ'����uf� �e?������2]�wY�='�D�'�)k�~��@�����DI�Я��<���f��
8KW�΍� ��7�ޠ�B���KYJX�ü�!�=�?��9v�f�� \�V�)�Uw��E'���x}��p��I�W�,�	�	�r���7�"�l6�{�:��/.���km�&�i!&I�)�q���j�V�JK�&�NE��&ϔ��{�8ߞ�fs�����E����AҁzZ.����X�9��8+mq��ͱ���&b
Y��9������yUp�V&�Z��EEZC;8-X�.����h�K�	?u��\my�ӟP�K� 1+>P�^v�u�����q;��F8��[��Yغ��kF�xr��<*��k��8�k��J�~"&z��:��/��E     
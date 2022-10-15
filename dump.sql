--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    valid boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(30) NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTc2NTM3MiwiZXhwIjoxNjY1ODUxNzcyfQ.0yzyUdvJLByWQ2stsQgCNcevmExVvIALblFdkUIfUzA', 1, true, '2022-10-14 13:36:12.746772');
INSERT INTO public.sessions VALUES (6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTc2NzczNSwiZXhwIjoxNjY1ODU0MTM1fQ.cfNL7SHcRS5GDBm6UPJPFsBTQBm4rVD0B-h-iptIW5s', 1, true, '2022-10-14 14:15:35.783378');
INSERT INTO public.sessions VALUES (8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2NTc2ODQwNiwiZXhwIjoxNjY1ODU0ODA2fQ.tta9IeRIbLK0z0jewb2hZ2F0UcAhVgjH0xoZaYOWRgo', 2, true, '2022-10-14 14:26:46.931654');
INSERT INTO public.sessions VALUES (9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg1MjM4MSwiZXhwIjoxNjY1OTM4NzgxfQ.ekYNwOwfYFMgCDvDHLGPWeuQpv4pS8rMi5A5QGegzKU', 1, true, '2022-10-15 13:46:21.458929');
INSERT INTO public.sessions VALUES (10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg2MDI3MSwiZXhwIjoxNjY1OTQ2NjcxfQ.t_8DKECNIXjdmqcGRyGGhR7NASktB_Btu28zFXUyfrA', 1, true, '2022-10-15 15:57:51.210259');
INSERT INTO public.sessions VALUES (11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg2MDI4MiwiZXhwIjoxNjY1OTQ2NjgyfQ.bZEpAT3UYkbEHkQW4pgIoyy-D1V0f0yD-j1QoqUSAfo', 1, true, '2022-10-15 15:58:02.778806');
INSERT INTO public.sessions VALUES (12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg2MDI4OCwiZXhwIjoxNjY1OTQ2Njg4fQ.mCa1hbWbbli1frdXbWPuMiwYNW2uz_Wk1FYMd7xJ2Jk', 1, true, '2022-10-15 15:58:08.055427');
INSERT INTO public.sessions VALUES (13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg2MDUyMywiZXhwIjoxNjY1OTQ2OTIzfQ.pq3VqFDrGzrlb0wVEo7eAO0l6yqTvzGZ7qhZo45RGdU', 1, true, '2022-10-15 16:02:03.914946');
INSERT INTO public.sessions VALUES (14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg2MDU0MywiZXhwIjoxNjY1OTQ2OTQzfQ.xpghory3i4r00lJO1dOLcLghrtGYeptNqmRh8hojd-4', 1, true, '2022-10-15 16:02:23.195965');
INSERT INTO public.sessions VALUES (15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY2NTg2Mjc1MiwiZXhwIjoxNjY1OTQ5MTUyfQ.WyoMwP1itjRDUmWMKyR45i1HDUVJ48ln5TP_sxi4nnU', 4, true, '2022-10-15 16:39:12.828247');
INSERT INTO public.sessions VALUES (16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY2NTg2Nzg5NSwiZXhwIjoxNjY1OTU0Mjk1fQ.LBT8Qs43M0dQ7dUTamsdmC273rniHi6st9dtftujn-Y', 4, true, '2022-10-15 18:04:55.404849');
INSERT INTO public.sessions VALUES (17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTg3MDgyNCwiZXhwIjoxNjY1OTU3MjI0fQ.EjSZDFEukyUhQuy_PtmEvOBypGsQXovsCQIVRy-bliQ', 1, true, '2022-10-15 18:53:44.887667');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (7, 1, 'A-NONkly', 'https://ge.globo.com/sp/futebol/copa-do-brasil/jogo/12-10-2022/corinthians-flamengo.ghtml', '2022-10-13 00:34:09.726968');
INSERT INTO public.urls VALUES (10, 2, 'rQjMXkxJ', 'https://www.facebook.com', '2022-10-13 20:47:04.01804');
INSERT INTO public.urls VALUES (11, 2, 'c0rvbBFj', 'https://www.facebook.com', '2022-10-14 14:16:42.520656');
INSERT INTO public.urls VALUES (12, 2, '1BqKZOZU', 'https://www.facebook.com', '2022-10-14 14:22:54.102589');
INSERT INTO public.urls VALUES (13, 2, 'e5a9dhlN', 'https://www.facebook.com', '2022-10-14 14:26:49.017316');
INSERT INTO public.urls VALUES (14, 2, 'UfLcpCVp', 'https://www.facebook.com', '2022-10-15 13:56:22.98278');
INSERT INTO public.urls VALUES (15, 2, 'qdMAIzj4', 'https://www.facebook.com', '2022-10-15 14:06:58.371255');
INSERT INTO public.urls VALUES (16, 4, 'L12EFD_t', 'https://www.facebook.com', '2022-10-15 17:26:27.219447');
INSERT INTO public.urls VALUES (17, 4, 'rO4RBy0C', 'https://www.facebook.com', '2022-10-15 17:43:12.241757');
INSERT INTO public.urls VALUES (19, 4, 'wiSfq54o', 'https://www.facebook.com', '2022-10-15 18:39:37.628771');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Gersin', 'gersin@gersin.com', '$2b$10$VRG6RnZsn2TcuqOZ604Vw.1teV5jogTfHuNrcqHeRdeAYb/JlLlBe', '2022-10-12 15:42:47.029519');
INSERT INTO public.users VALUES (2, 'Rodrigo', 'rodrigo@teste.com', '$2b$10$vfTERKCA2L2Br5xauZx6qe9Aib21RiZrpUzzSQHjl.OnG2fCs.Z6i', '2022-10-13 15:40:31.248711');
INSERT INTO public.users VALUES (3, 'Rodrigo', 'rodrigo123@teste.com', '$2b$10$kSzZ9ey0tzKlsEB2bB0cS.N8QaOwrUuoYSZX6OkLn7C5uETtUsMia', '2022-10-15 13:33:55.587412');
INSERT INTO public.users VALUES (4, 'Rodrigo2', 'rodrigo2@teste.com', '$2b$10$ikZKE4kY5FaOtsOifzd13uzTT4rqJxJNiBMCgfiz7KZz0/STlkSDm', '2022-10-15 15:56:24.436232');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (4, 7, '2022-10-13 00:43:25.409926');
INSERT INTO public.visits VALUES (7, 14, '2022-10-15 14:00:32.086532');
INSERT INTO public.visits VALUES (8, 14, '2022-10-15 14:01:40.995676');
INSERT INTO public.visits VALUES (10, 14, '2022-10-15 17:46:09.906044');
INSERT INTO public.visits VALUES (11, 14, '2022-10-15 17:54:11.894387');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 17, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 11, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- PostgreSQL database dump complete
--


create table if not exists event (
    id uuid default gen_random_uuid(),
    admin_name varchar(255),
    admin_email varchar(255),
    name varchar(255) not null,
    description varchar(255),
    primary key (id)
);

create table if not exists file (
    id uuid default gen_random_uuid(),
    object_name varchar(255) not null unique,
    name varchar(255),
    size bigint,
    created_at timestamp with time zone,
    event_id uuid,
    primary key (id),
    foreign key (event_id) references event
);

create table if not exists meeting (
    id uuid default gen_random_uuid(),
    available_places bigint not null,
    starts_at timestamp with time zone not null,
    event_id uuid not null,
    primary key (id),
    foreign key (event_id) references event
);

create table if not exists participant (
    id uuid default gen_random_uuid(),
    primary key (id)
);

create table booking (
    meeting_id uuid not null,
    participant_id uuid not null,
    primary key (meeting_id, participant_id),
    foreign key (participant_id) references participant,
    foreign key (meeting_id) references meeting
);

create table participant_attribute (
    id uuid not null,
    name varchar(255) not null,
    required boolean not null,
    event_id uuid not null,
    primary key (id),
    foreign key (event_id) references event
);

create table participant_attribute_value (
    id uuid not null,
    value varchar(255) not null,
    attribute_id uuid not null,
    participant_id uuid not null,
    primary key (id),
    foreign key (attribute_id) references participant_attribute,
    foreign key (participant_id) references participant
);

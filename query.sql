select *,

(
    strftime('%Y', discovery_date) || '-' || strftime('%m', discovery_date) || '-' ||  strftime('%d', discovery_date) 
) as fire_discovery_date,

(
    strftime('%Y', cont_date) || '-' || strftime('%m', cont_date) || '-' ||  strftime('%d', cont_date) 
) as fire_cont_date


from fires  

----------------------
-- Delete Duplicate 
-- Records from Fires
----------------------
-- Step 1. Validate duplicate (unique) rows
select 
    DISTINCT fpa_id, count(*)
from Fires
group by fpa_id

-- Step 2. DELETE Duplicates
delete from fires
where rowid not in(select min(rowid)
                            from fires
                            group by fpa_id)


---- Data Validation ----
select 
    DISTINCT fpa_id, count(*)
from Fires
group by fpa_id
having count(*) >1


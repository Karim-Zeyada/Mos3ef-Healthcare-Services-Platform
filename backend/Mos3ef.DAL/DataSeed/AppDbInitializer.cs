using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Mos3ef.DAL.Database;
using Mos3ef.DAL.Enum;
using Mos3ef.DAL.Enums;
using Mos3ef.DAL.Models;

namespace Mos3ef.DAL.DataSeed
{
    public static class AppDbInitializer
    {
        public static async Task SeedDataAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context)
        {
            // 1. Seed Roles
            string[] roles = { "Admin", "Hospital", "Patient" };
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                    await roleManager.CreateAsync(new IdentityRole(role));
            }

            // 2. Seed Admin
            string adminEmail = "admin@mos3ef.com";
            string defaultPassword = "Admin@123";

            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    EmailConfirmed = true,
                    UserType = UserType.Patient // Default or admin
                };

                var createResult = await userManager.CreateAsync(adminUser, defaultPassword);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            // 3. Seed Hospitals (if none exist)
            if (!await context.Hospitals.AnyAsync())
            {
                var hospitalData = new[]
                {
                    new
                    {
                        Name = "مستشفى القصر العيني الفرنساوي",
                        Email = "kasralainy@mos3ef.com",
                        Phone = "0223654060",
                        Address = "شارع القصر العيني، المنيل، القاهرة",
                        Region = "القاهرة",
                        Latitude = 30.0305,
                        Longitude = 31.2289,
                        Website = "https://kasralainy.edu.eg",
                        Description = "أحد أقدم وأكبر الصروح الطبية في مصر والشرق الأوسط، يقدم كافة التخصصات والخدمات الجراحية والطوارئ بأحدث التجهيزات.",
                        ImageUrl = "https://media.istockphoto.com/id/1419877131/photo/building-facade-of-a-hospital-in-commercial-and-business-district-under-blue-sky.jpg?s=612x612&w=0&k=20&c=wGxVbFSxljSZb_t_qROE4RwsCgssKbGlqawAtmQ88Ls="
                    },
                    new
                    {
                        Name = "مستشفى السلام الدولي",
                        Email = "salam@mos3ef.com",
                        Phone = "0219885",
                        Address = "كورنيش النيل، المعادي، القاهرة",
                        Region = "المعادي",
                        Latitude = 29.9721,
                        Longitude = 31.2785,
                        Website = "https://assalamhospital.com",
                        Description = "مستشفى رائد معتمد دولياً يقدم رعاية صحية بمعايير عالمية، مجهز بأحدث وحدات العناية المركزة وجراحات القلب المفتوح.",
                        ImageUrl = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى دار الفؤاد",
                        Email = "daralfouad@mos3ef.com",
                        Phone = "0216370",
                        Address = "محور 26 يوليو، السادس من أكتوبر، الجيزة",
                        Region = "6 أكتوبر",
                        Latitude = 30.0074,
                        Longitude = 30.9856,
                        Website = "https://daralfouad.net",
                        Description = "صرح طبي متكامل حاصل على شهادة JCI الدولية، متخصص في طب وجراحة القلب والأوعية الدموية والأورام وزراعة الأعضاء.",
                        ImageUrl = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى السعودي الألماني",
                        Email = "sgh@mos3ef.com",
                        Phone = "0216259",
                        Address = "طريق جوزيف تيتو، النزهة، مصر الجديدة، القاهرة",
                        Region = "مصر الجديدة",
                        Latitude = 30.1312,
                        Longitude = 31.3789,
                        Website = "https://sghcairo.com",
                        Description = "مستشفى متعدد التخصصات يقدم رعاية طبية متطورة على أيدي نخبة من الاستشاريين الألمان والمصريين مع غرف عمليات بنظام الكبسولة.",
                        ImageUrl = "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى كليوباترا",
                        Email = "cleopatra@mos3ef.com",
                        Phone = "0219668",
                        Address = "39 شارع كليوباترا، ميدان صلاح الدين، مصر الجديدة، القاهرة",
                        Region = "مصر الجديدة",
                        Latitude = 30.0921,
                        Longitude = 31.3285,
                        Website = "https://cleopatrahospitals.com",
                        Description = "إحدى أعرق المستشفيات الخاصة في القاهرة، تضم أقسام طوارئ متطورة، حضانات مبتسرين، وعيادات خارجية في جميع التخصصات.",
                        ImageUrl = "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى الجوي التخصصي",
                        Email = "airforce@mos3ef.com",
                        Phone = "0219448",
                        Address = "شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة",
                        Region = "التجمع الخامس",
                        Latitude = 30.0275,
                        Longitude = 31.4285,
                        Website = "https://afh.gov.eg",
                        Description = "مستشفى تخصصي حديث يمتلك أحدث مركز للأشعة التداخلية والرنين المغناطيسي ومهبط طائرات إسعاف مجهز على مدار 24 ساعة.",
                        ImageUrl = "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى أندلسية المعادي",
                        Email = "andalusia@mos3ef.com",
                        Phone = "0216781",
                        Address = "شارع النصر، المعادي الجديدة، القاهرة",
                        Region = "المعادي",
                        Latitude = 29.9654,
                        Longitude = 31.2954,
                        Website = "https://andalusiagroup.net",
                        Description = "مستشفى تخصصي متميز في جراحات العظام والمناظير والمخ والأعصاب ووحدة عناية مركزة متكاملة وخدمات رعاية منزلية.",
                        ImageUrl = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop"
                    },
                    new
                    {
                        Name = "مستشفى 57357",
                        Email = "cch57357@mos3ef.com",
                        Phone = "0219057",
                        Address = "1 شارع سكة الإمام، مجرى العيون، السيدة زينب، القاهرة",
                        Region = "السيدة زينب",
                        Latitude = 30.0215,
                        Longitude = 31.2421,
                        Website = "https://57357.org",
                        Description = "أكبر مستشفى متخصص في علاج أورام وسرطان الأطفال في الشرق الأوسط وأفريقيا بنسب شفاء تضاهي المعايير العالمية.",
                        ImageUrl = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop"
                    }
                };

                var createdHospitals = new List<Hospital>();

                foreach (var h in hospitalData)
                {
                    var user = new ApplicationUser
                    {
                        UserName = h.Email,
                        Email = h.Email,
                        EmailConfirmed = true,
                        UserType = UserType.Hospital
                    };

                    var userResult = await userManager.CreateAsync(user, "Hospital@123");
                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Hospital");

                        var hospital = new Hospital
                        {
                            Name = h.Name,
                            UserId = user.Id,
                            Address = h.Address,
                            Region = h.Region,
                            Phone_Number = h.Phone,
                            Latitude = h.Latitude,
                            Longitude = h.Longitude,
                            Website = h.Website,
                            Description = h.Description,
                            ImageUrl = h.ImageUrl,
                            Opening_Hours = DateTime.Now
                        };

                        context.Hospitals.Add(hospital);
                        createdHospitals.Add(hospital);
                    }
                }

                await context.SaveChangesAsync();

                // 4. Seed Services for each hospital
                var servicesList = new List<Service>();

                if (createdHospitals.Count >= 8)
                {
                    // Hospital 1: Kasr Al Ainy
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[0].HospitalId, Name = "طوارئ وإنعاش قلبي 24/7", Category = CategoryType.EmergencyRoom, Price = 250, Availability = "متاح", Working_Hours = "24 ساعة", Description = "استقبال طوارئ مجهز بكامل أجهزة الإنعاش القلبي الرئوي واستشاريين على مدار الساعة." },
                        new Service { HospitalId = createdHospitals[0].HospitalId, Name = "عناية مركزة حرجة (ICU)", Category = CategoryType.ICU, Price = 1800, Availability = "متاح", Working_Hours = "24 ساعة", Description = "أسرة عناية مركزة مزودة بأحدث أجهزة التنفس الصناعي والمراقبة الحيوية." },
                        new Service { HospitalId = createdHospitals[0].HospitalId, Name = "بنك الدم وفصل البلازما", Category = CategoryType.BloodBank, Price = 350, Availability = "متاح", Working_Hours = "24 ساعة", Description = "توفير كافة الفصائل ومشتقات الدم مع فحص دقيق للأجسام المضادة." },
                        new Service { HospitalId = createdHospitals[0].HospitalId, Name = "أشعة رنين مغناطيسي (MRI)", Category = CategoryType.Radiology, Price = 950, Availability = "متاح", Working_Hours = "8:00 ص - 10:00 م", Description = "جهاز رنين مغناطيسي عالي الدقة 1.5 تسلا لتشخيص أدق التفاصيل العصبية والمفصلية." }
                    });

                    // Hospital 2: As-Salam International
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[1].HospitalId, Name = "وحدة قسطرة القلب ورعاية الشرايين", Category = CategoryType.CardiologyUnit, Price = 3500, Availability = "متاح", Working_Hours = "24 ساعة", Description = "قسطرة تشخيصية وعلاجية طارئة وتركيب دعامات على يد نخبة من أساتذة القلب." },
                        new Service { HospitalId = createdHospitals[1].HospitalId, Name = "غرفة عمليات كبسولة معقمة", Category = CategoryType.OperationTheater, Price = 4200, Availability = "متاح", Working_Hours = "24 ساعة", Description = "أحدث غرف العمليات الجراحية بنظام التدفق الهوائي الرأسي لضمان أعلى درجات التعقيم." },
                        new Service { HospitalId = createdHospitals[1].HospitalId, Name = "قسم الولادة ورعاية الأمومة", Category = CategoryType.MaternityWard, Price = 2800, Availability = "متاح", Working_Hours = "24 ساعة", Description = "أجنحة ولادة طبيعية وقيصرية مجهزة مع رعاية مخصصة للأم والمولود." },
                        new Service { HospitalId = createdHospitals[1].HospitalId, Name = "حضانة أطفال مبتسرين (NICU)", Category = CategoryType.NICU, Price = 1200, Availability = "متاح", Working_Hours = "24 ساعة", Description = "حضانات متطورة لعلاج الصفراء وصعوبة التنفس للأطفال ناقصي النمو." }
                    });

                    // Hospital 3: Dar Al Fouad
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[2].HospitalId, Name = "طوارئ أمراض القلب والجلطات", Category = CategoryType.EmergencyRoom, Price = 400, Availability = "متاح", Working_Hours = "24 ساعة", Description = "استجابة سريعة لجلطات القلب والذبحات الصدرية بأعلى معايير البروتوكول الدولي." },
                        new Service { HospitalId = createdHospitals[2].HospitalId, Name = "وحدة الغسيل الكلوي المتطورة", Category = CategoryType.DialysisUnit, Price = 800, Availability = "متاح", Working_Hours = "7:00 ص - 11:00 م", Description = "ماكينات غسيل كلوي حديثة بنظام الفلترة العالية ومتابعة أطباء الكلى." },
                        new Service { HospitalId = createdHospitals[2].HospitalId, Name = "إسعاف عناية مركزة متنقل", Category = CategoryType.AmbulanceService, Price = 600, Availability = "متاح", Working_Hours = "24 ساعة", Description = "سيارة إسعاف مجهزة بجهاز صدمات وتنفس صناعي وطاقم مسعفين متخصصين." }
                    });

                    // Hospital 4: Saudi German
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[3].HospitalId, Name = "قسم الأطفال التخصصي", Category = CategoryType.PediatricWard, Price = 500, Availability = "متاح", Working_Hours = "24 ساعة", Description = "عيادات وطوارئ أطفال مع أسرة إقامة مجهزة وبيئة ملائمة للأطفال." },
                        new Service { HospitalId = createdHospitals[3].HospitalId, Name = "معمل التحاليل الطبية الشامل", Category = CategoryType.Laboratory, Price = 300, Availability = "متاح", Working_Hours = "24 ساعة", Description = "تحاليل دم شاملة، هرمونات، وأورام بأجهزة أوتوماتيكية سريعة ودقيقة." },
                        new Service { HospitalId = createdHospitals[3].HospitalId, Name = "صيدلية مركزية 24 ساعة", Category = CategoryType.Pharmacy, Price = 0, Availability = "متاح", Working_Hours = "24 ساعة", Description = "توفر جميع الأدوية والمستلزمات الطبية مع خدمة التوصيل والاستشارة الصيدلانية." }
                    });

                    // Hospital 5: Cleopatra
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[4].HospitalId, Name = "طوارئ عامة وحوادث", Category = CategoryType.EmergencyRoom, Price = 300, Availability = "متاح", Working_Hours = "24 ساعة", Description = "استقبال فوري للحالات الحرجة والحوادث مع غرف إنعاش وأشعة فورية." },
                        new Service { HospitalId = createdHospitals[4].HospitalId, Name = "عيادات خارجية متعددة التخصصات", Category = CategoryType.OutpatientClinic, Price = 450, Availability = "متاح", Working_Hours = "9:00 ص - 9:00 م", Description = "عيادات باطنة، عظام، جراحة، جلدية، وأسنان بنظام حجز منظم." },
                        new Service { HospitalId = createdHospitals[4].HospitalId, Name = "غرفة إقامة خاصة VIP", Category = CategoryType.PrivateRoom, Price = 2000, Availability = "متاح", Working_Hours = "24 ساعة", Description = "غرفة فندقية خاصة للمريض والمرافق تشمل شاشة تلفزيون وخدمة تمريض مخصصة." }
                    });

                    // Hospital 6: Air Force Hospital
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[5].HospitalId, Name = "أشعة مقطعية متعددة المقاطع (CT)", Category = CategoryType.Radiology, Price = 750, Availability = "متاح", Working_Hours = "24 ساعة", Description = "جهاز أشعة مقطعية 128 مقطع لتشخيص شرايين القلب والدماغ وأورام الجسم." },
                        new Service { HospitalId = createdHospitals[5].HospitalId, Name = "عناية مركزة قلبية (CCU)", Category = CategoryType.ICU, Price = 2200, Availability = "متاح", Working_Hours = "24 ساعة", Description = "رعاية مركزة متخصصة لمرضى جلطات وفشل القلب تحت إشراف استشاريين." },
                        new Service { HospitalId = createdHospitals[5].HospitalId, Name = "خدمة الإسعاف الجوي والطائر", Category = CategoryType.AmbulanceService, Price = 5000, Availability = "متاح", Working_Hours = "24 ساعة", Description = "إسعاف جوي سريع للحالات الحرجة ونقل المرضى بين المحافظات." }
                    });

                    // Hospital 7: Andalusia Maadi
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[6].HospitalId, Name = "جناح إقامة عام استشفائي", Category = CategoryType.GeneralWard, Price = 900, Availability = "متاح", Working_Hours = "24 ساعة", Description = "أسرة إقامة مريحة مع متابعة دورية للعلامات الحيوية والرعاية الطبية." },
                        new Service { HospitalId = createdHospitals[6].HospitalId, Name = "عيادة الأسنان وجراحة الفكين", Category = CategoryType.DentalClinic, Price = 350, Availability = "متاح", Working_Hours = "10:00 ص - 10:00 م", Description = "علاج جذور، زراعة أسنان، وتجميل بأحدث التقنيات الرقمية والتعقيم الدقيق." },
                        new Service { HospitalId = createdHospitals[6].HospitalId, Name = "مركز التأهيل والعلاج الطبيعي", Category = CategoryType.Rehabilitation, Price = 400, Availability = "متاح", Working_Hours = "9:00 ص - 8:00 م", Description = "جلسات علاج طبيعي وتأهيل ما بعد الجراحات والإصابات الرياضية بأجهزة ليزر حديثة." }
                    });

                    // Hospital 8: 57357
                    servicesList.AddRange(new[]
                    {
                        new Service { HospitalId = createdHospitals[7].HospitalId, Name = "طوارئ أورام الأطفال", Category = CategoryType.EmergencyRoom, Price = 0, Availability = "متاح", Working_Hours = "24 ساعة", Description = "استقبال طوارئ مخصص للأطفال مرضى الأورام مع تعقيم فائق ودعم مناعي." },
                        new Service { HospitalId = createdHospitals[7].HospitalId, Name = "معمل أبحاث وتطابق الأنسجة", Category = CategoryType.Laboratory, Price = 500, Availability = "متاح", Working_Hours = "8:00 ص - 6:00 م", Description = "أحدث معامل الجينات الوراثية وتطابق أنسجة نخاع العظام." }
                    });

                    context.Services.AddRange(servicesList);
                    await context.SaveChangesAsync();
                }

                // 5. Seed Demo Patients
                var demoPatients = new[]
                {
                    new { Name = "كريم زيادة", Email = "karim.patient@mos3ef.com", Phone = "01012345678", Location = "القاهرة", Address = "المعادي، القاهرة" },
                    new { Name = "أحمد مصطفى", Email = "ahmed.patient@mos3ef.com", Phone = "01123456789", Location = "الجيزة", Address = "الدقي، الجيزة" },
                    new { Name = "سارة علي", Email = "sara.patient@mos3ef.com", Phone = "01234567890", Location = "القاهرة", Address = "مدينة نصر، القاهرة" }
                };

                var createdPatients = new List<Patient>();

                foreach (var p in demoPatients)
                {
                    var user = new ApplicationUser
                    {
                        UserName = p.Email,
                        Email = p.Email,
                        EmailConfirmed = true,
                        UserType = UserType.Patient
                    };

                    var userResult = await userManager.CreateAsync(user, "Patient@123");
                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, "Patient");

                        var patient = new Patient
                        {
                            Name = p.Name,
                            UserId = user.Id,
                            Address = p.Address,
                            Location = p.Location,
                            ImageUrl = null
                        };

                        context.Patients.Add(patient);
                        createdPatients.Add(patient);
                    }
                }

                await context.SaveChangesAsync();

                // 6. Seed Reviews & Saved Services
                if (createdPatients.Count > 0 && servicesList.Count > 0)
                {
                    var p1 = createdPatients[0];
                    var p2 = createdPatients.Count > 1 ? createdPatients[1] : p1;
                    var p3 = createdPatients.Count > 2 ? createdPatients[2] : p1;

                    var reviews = new List<Review>
                    {
                        new Review { PatientId = p1.PatientId, ServiceId = servicesList[0].ServiceId, Rating = 5, Comment = "خدمة الطوارئ كانت سريعة جداً وتعامل الفريق الطبي ممتاز.", Review_Date = DateTime.Now.AddDays(-5) },
                        new Review { PatientId = p2.PatientId, ServiceId = servicesList[0].ServiceId, Rating = 5, Comment = "طاقم التمريض كفء والأجهزة حديثة ونظافة المستشفى مبهرة.", Review_Date = DateTime.Now.AddDays(-3) },
                        new Review { PatientId = p3.PatientId, ServiceId = servicesList[1].ServiceId, Rating = 4, Comment = "العناية المركزة مجهزة على أعلى مستوى والأطباء متواجدون باستمرار.", Review_Date = DateTime.Now.AddDays(-2) },
                        new Review { PatientId = p1.PatientId, ServiceId = servicesList[4].ServiceId, Rating = 5, Comment = "عملية القسطرة تمت بنجاح وبسرعة قياسية، شكراً لفريق القلب.", Review_Date = DateTime.Now.AddDays(-10) },
                        new Review { PatientId = p2.PatientId, ServiceId = servicesList[7].ServiceId, Rating = 5, Comment = "حضانة الأطفال ممتازة والمتابعة مستمرة على مدار الساعة.", Review_Date = DateTime.Now.AddDays(-1) }
                    };

                    context.Reviews.AddRange(reviews);

                    // Saved services for Karim (demo patient 1)
                    var saved = new List<SavedService>
                    {
                        new SavedService { PatientId = p1.PatientId, ServiceId = servicesList[0].ServiceId, Saved_Date = DateTime.Now.AddDays(-2) },
                        new SavedService { PatientId = p1.PatientId, ServiceId = servicesList[4].ServiceId, Saved_Date = DateTime.Now.AddDays(-1) },
                        new SavedService { PatientId = p1.PatientId, ServiceId = servicesList[8].ServiceId, Saved_Date = DateTime.Now }
                    };

                    context.SavedServices.AddRange(saved);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
